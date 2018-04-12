import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.justep.design.model.kql.QRelation;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.system.component.data.DataUtils;
import com.justep.ui.system.component.data.bizdata.BizDataDef;
import com.justep.ui.system.component.data.bizdata.BizDataUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class BizData implements JavaTemplate {
	private Element dataDef;
	private Element rootE;
	private Map<String, Object> context;
	private BizDataDef bizDataDef;
	private String dataId;
	private String partId;
	private String relationDefinitionText;
	private String calcRelationDefinitionText;
	private Map<String, String> relationDefaultValues;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Element execute(Element bound, Map context) throws XBLException {
		this.relationDefaultValues = new HashMap<String, String>();
		this.dataDef = bound;
		this.dataId = DataUtils.getDataId(dataDef);
		this.partId = "";
		this.context = context;

		try {
			bizDataDef = new BizDataDef(dataDef, this.context);
		} catch (Exception e) {
			throw XBLException.create(e, UISystemMessages.XBL_BIZDATA_DEFINE_ERROR, dataId, e.getMessage());
		}

		this.rootE = DocumentHelper.createElement("root");
		if (!bizDataDef.isAutoLoad() && !bizDataDef.isAutoNew()) {
			this.partId = DataUtils.getPartId(dataDef);
			this.rootE = this.rootE.addElement(new QName("part", DataUtils.XFORMS_NAMESPACE));
			this.rootE.addAttribute("id", this.partId);
			this.rootE.addAttribute(new QName("lazy", DataUtils.XFORMS_NAMESPACE), "true");
		}
		// 生成instance
		this.rootE.add(this.createInstance());
		// 处理规则
		this.processRule();
		// 处理事件
		this.processAction();
		// 处理data对象
		this.processData();

		//把data定义写入上下文
		this.context.put("data." + this.dataId, bizDataDef);

		return DataUtils.isStringEmpty(this.partId) ? this.rootE : this.rootE.getParent();
	}

	/**
	 * 创建data对应的instance
	 * 
	 * @return
	 */
	private Element createInstance() throws XBLException {
		Element instanceE = DocumentHelper.createElement(new QName("instance", DataUtils.XFORMS_NAMESPACE));

		String Id = this.dataId;
		instanceE.addAttribute(new QName("id"), Id);
		instanceE.addAttribute(new QName("update-mode"), bizDataDef.getUpdateMode());
		instanceE.addAttribute(new QName("concept"), bizDataDef.getConcept());
		instanceE.addAttribute(new QName("type"), bizDataDef.getStoreType());

		if (BizDataUtils.isTreeData(dataDef)) {
			// 处理节点的类型和层次
			String nodeKindPath = BizDataUtils.getNodeKindPath(dataDef);
			if (!DataUtils.isStringEmpty(nodeKindPath))
				instanceE.addAttribute(new QName("node-kind-path"), DataUtils.XpathToLocalName(nodeKindPath));
			String nodeLevelPath = BizDataUtils.getNodeLevelPath(dataDef);
			if (!DataUtils.isStringEmpty(nodeLevelPath))
				instanceE.addAttribute(new QName("node-level-path"), DataUtils.XpathToLocalName(nodeLevelPath));
			String virtualRootLabel = BizDataUtils.getVirtualRootLabel(dataDef);
			if (!DataUtils.isStringEmpty(virtualRootLabel))
				instanceE.addAttribute(new QName("virtual-root-label"), virtualRootLabel);
		}

		// 产生主的instance属性
		String masterInstanceID = BizDataUtils.getMasterDataId(dataDef);
		if (!DataUtils.isStringEmpty(masterInstanceID)) {
			instanceE.addAttribute(new QName("master-instance"), masterInstanceID);
			// 从data，生成关联的relation
			String masterRelation = BizDataUtils.getMasterRelation(dataDef);
			if (DataUtils.isStringEmpty(masterRelation))
				throw XBLException.create(UISystemMessages.XBL_BIZDATA_MASTER_DEFINE_ERROR, dataId);
			instanceE.addAttribute(new QName("relation"), DataUtils.toLocalName(masterRelation));
			// 从数据根据主自动加载
			if (!bizDataDef.isAutoLoadSlaveData())
				instanceE.addAttribute(new QName("auto-load"), "false");
		}

		// 生成计算字段
		// 增加计算字段的规则处理
		String caclRelations = "";
		List<Element> calculateDefs = BizDataUtils.getCalculateRelation(dataDef);
		for (Element calculateItem : calculateDefs) {
			String relation = DataUtils.toLocalName(calculateItem.attributeValue(new QName("relation")));
			if (!DataUtils.isStringEmpty(relation))
				caclRelations = !DataUtils.isStringEmpty(caclRelations) ? caclRelations + "," + relation : relation;
		}
		if (!DataUtils.isStringEmpty(caclRelations)) {
			instanceE.addAttribute(new QName("cacl-relation"), caclRelations);
		}

		return instanceE;
	}

	/**
	 * 初始化数据处理
	 */
	//	private void processLoadData(){
	//		if(bizDataDef.loadDataWhenInit()){
	//			Element actionE = DataUtils.createAction(DataUtils.LOAD_DATA_EVENT, null);
	//			String script = "dataUtils.refreshData('"+this.dataId+"');";
	//			actionE.add(DataUtils.createScript(script));
	//			this.rootE.add(actionE);
	//		}
	//	}
	/**
	 * 处理data相关的规则
	 * @throws XBLException 
	 */
	private void processRule() throws XBLException {
		// 规则的处理
		List<Element> rules = bizDataDef.getRuleDefList();
		for (Element rule : rules) {
			if (null != rule.attribute("concept"))
				processConceptRule(rule);
			else if (null != rule.attribute("relation"))
				processRelationRule(rule);
			else if (null != rule.attribute("action"))
				processActionRule(rule);
		}
		// 计算列规则的处理
		processCalculateRelation();
		// 数据类型的绑定
		processRelationTypeBind();
	}

	private void processConceptRule(Element rule) throws XBLException {
		String concept = rule.attributeValue("concept");
		String alias = bizDataDef.getMainConcept().getAlias();
		String name = bizDataDef.getConcept();
		if (concept.equals(name) || concept.equals(alias)) {
			String readonly = rule.attributeValue("readonly");
			if (!DataUtils.isStringEmpty(readonly)) {
				String nodeset = "instance('" + this.dataId + "')";
				Element bindE = DataUtils.createBind(nodeset, null);
				bindE.addAttribute("readonly", readonly);
				rootE.add(bindE);
			}
		} else
			throw XBLException.create(UISystemMessages.XBL_BIZDATA_CONCEPT_DEFINE_ERROR, rule.asXML());
	}

	private void processRelationRule(Element rule) {
		String relation = rule.attributeValue("relation");
		String nodeset = "instance('" + this.dataId + "')/" + relation;
		Element bindE = DataUtils.getBind(nodeset, this.rootE);
		if (null == bindE) {
			bindE = DataUtils.createBind(nodeset, null);
			rootE.add(bindE);
		}
		// TODO 增加字段数据校验
		String[] bindAttributeNames = { "constraint", "required", "relevant", "calculate", "readonly", "format" };
		for (int i = 0; i < bindAttributeNames.length; i++) {
			String bindAttributeName = bindAttributeNames[i];
			String value = rule.attributeValue(bindAttributeName);
			if (!DataUtils.isStringEmpty(value))
				bindE.addAttribute(bindAttributeName, value);
		}

		String alert = rule.attributeValue("alert");
		if (!DataUtils.isStringEmpty(alert))
			bindE.addAttribute("validInfo", alert);

		String defaultValue = rule.attributeValue("default-value");
		if (!DataUtils.isStringEmpty(defaultValue))
			this.relationDefaultValues.put(relation, defaultValue);
	}

	private void processActionRule(Element rule) {
		String actionName = rule.attributeValue("action");
		if (!DataUtils.isStringEmpty(actionName)) {
			String[] ruleAttributeNames = { "relevant", "readonly" };
			for (int i = 0; i < ruleAttributeNames.length; i++) {
				String ruleAttributeName = ruleAttributeNames[i];
				String key = actionName + "." + ruleAttributeName;
				String value = rule.attributeValue(ruleAttributeName);
				if (!DataUtils.isStringEmpty(value))
					bizDataDef.getActionRule().put(key, value);
			}
		}
	}

	/**
	 * 计算字段和统计字段的处理
	 */
	private void processCalculateRelation() {
		String instanceID = this.dataId;

		// 计算字段的处理
		List<Element> calculateDefs = bizDataDef.getCalculateRelationDefList();
		this.calcRelationDefinitionText = "";
		for (Element calculateItem : calculateDefs) {
			String exprText = calculateItem.attributeValue(new QName("calculate"));
			String relation = DataUtils.toLocalName(calculateItem.attributeValue(new QName("relation")));
			bizDataDef.getCalculateRelationList().add(relation);

			//js对象的定义生成
			//defCalcRelations : "{'计算relation 别名':{'type 类型':'http://www.w3.org/2001/XMLSchema#string'}}",
			String type = "string";
			String s = calculateItem.attributeValue("type");
			if (!DataUtils.isStringEmpty(s)) {
				if (s.split(":").length > 1)
					type = s.split(":")[1];
				else
					type = s;
			}

			this.calcRelationDefinitionText += ("".equals(this.calcRelationDefinitionText) ? "" : ",") + "'" + relation
					+ "':{'type':'http://www.w3.org/2001/XMLSchema#" + type + "'}";

			if (!DataUtils.isStringEmpty(exprText) && !DataUtils.isStringEmpty(relation)) {
				String nodeset = "instance('" + instanceID + "')/" + relation;
				Element bindE = DataUtils.createBind(nodeset, exprText);
				rootE.add(bindE);
			}

			type = BizDataUtils.DATATYPEPROPERTIES.get(type.toLowerCase());
			if (!DataUtils.isStringEmpty(type) && !"string".equals(type)) {
				Element bindE = DataUtils.createBind("instance('" + this.dataId + "')/" + relation, null);
				bindE.addAttribute(new QName("type"), "xsd:" + type);
				this.rootE.add(bindE);
			}
		}

		// 统计字段处理
		List<Element> aggregateDefs = bizDataDef.getAggregateRelationDefList();
		for (Element aggregateItem : aggregateDefs) {
			String relation = DataUtils.toLocalName(aggregateItem.attributeValue(new QName("relation")));
			String exprText = aggregateItem.attributeValue(new QName("calculate"));
			if (!DataUtils.isStringEmpty(exprText) && !DataUtils.isStringEmpty(relation)) {
				String nodeset = "instance('" + instanceID + "')/@" + relation;
				Element bindE = DataUtils.createBind(nodeset, exprText);
				rootE.add(bindE);
			}
		}
	}

	/**
	 * 处理relation的数据类型bind
	 * @throws XBLException 
	 */
	private void processRelationTypeBind() throws XBLException {
		this.relationDefinitionText = "";
//		QRelation idColumn = bizDataDef.getIdColumn();
		for (String relation : bizDataDef.getRelationList()) {
			QRelation r = bizDataDef.getRelationRef(relation);
			if (null == r)
				throw XBLException.create(UISystemMessages.XBL_BIZDATA_RELATION_DEFINE_ERROR, dataId, relation);
			//这样加还是有问题，见组织机构维护功能，使用时不允许拿主键当外键使用,虚拟外键字段即可
//			if (r.isConcept() && !idColumn.equals(r)) {
//				this.relationDefinitionText += ("".equals(this.relationDefinitionText) ? "" : ",") + "'" + idColumn.getAlias() + "':"
//						+ this.getidColumnDefinitionText();
//			}
			String realType = bizDataDef.getRelationDataType(r);
			String type = BizDataUtils.DATATYPEPROPERTIES.get(realType.toLowerCase());
			String label = r.getLabel();
			//替换回车换行
			if (!DataUtils.isStringEmpty(label))
				label = label.replaceAll("\n", "").replaceAll("\r", "");

			String realRelationName = BizDataUtils.getQRelationFullName(r);
			// TODO 增加字段数据校验
			Element rule = (Element) this.dataDef.selectSingleNode("//*[local-name(.) = 'rule'][@relation='" + relation + "']");
			String ruleFormat = rule == null ? null : rule.attributeValue("format");
			String relationDefine = r.isRelation() ? BizDataUtils.getQRelationDefine(r) : "EXPRESS";
			// TODO 增加字段数据校验
			this.relationDefinitionText += ("".equals(this.relationDefinitionText) ? "" : ",") + "'" + relation + "':{'type':'" + realType
					+ "','relation':'" + realRelationName + "','define':'" + relationDefine + "','label':'" + label + "'"
					+ (ruleFormat != null ? ",'customFormat':butone.DataFormatRegex['" + ruleFormat + "']" : "") + "}";
			if (!DataUtils.isStringEmpty(type) && !"string".equals(type)) {
				Element bindE = DataUtils.createBind("instance('" + this.dataId + "')/" + relation, null);
				bindE.addAttribute(new QName("type"), "xsd:" + type);
				this.rootE.add(bindE);
			}
		}
	}

	/**
	 * 处理data相关的事件
	 */
	private void processAction() {
		List<Element> actions = bizDataDef.getActionDefList();
		for (Element action : actions) {
			Element e = (Element) action.clone();
			if (null == e.attribute("target"))
				e.addAttribute("target", dataId);
			this.rootE.add(e);
		}
	}

	/**
	 * 处理生成data的js对象
	 */
	private void processData() throws XBLException {
		//		 * definition格式：
		//		 * {'queryAction' : "**QueryAction",
		//		 *  'newAction' : "**CreateAction",
		//		 *  saveAction  : "**SaveAction",
		//		 *  concept : "{'sa_org概念名' : 'p 概念别名',...}",
		//		 *  limit : "20",
		//		 *  offset : "0",
		//		 *  updateMode : "whereVersion",
		//		 *  orderBys : "{'relation':0,'relation':1}",
		//		 *  filters : "{'filterID':filter,...}",
		//		 *  defaultValues : "{'relation别名' : '默认值',...}",
		//		 *  defRelations : "{'relation 别名':{'type 类型':'http://www.w3.org/2001/XMLSchema#string','relation 名':'p.sName'}}",
		//		 *  defCalcRelations : "{'计算relation 别名' : {'type 类型':'http://www.w3.org/2001/XMLSchema#string'}}",
		//		*   defAggRelations : "{'统计relation 别名' : realtion}"
		//		 *  masterData : "{'id':'data id','relation':'relation name'}"
		//		 * }
		String definition = "{";
		if (!DataUtils.isStringEmpty(bizDataDef.getReaderAction()))
			definition += bizDataDef.getDefinitionItem("queryAction", bizDataDef.getReaderAction());
		if (!DataUtils.isStringEmpty(bizDataDef.getWriterAction()))
			definition += "," + bizDataDef.getDefinitionItem("saveAction", bizDataDef.getWriterAction());
		if (!DataUtils.isStringEmpty(bizDataDef.getCreatorAction()))
			definition += "," + bizDataDef.getDefinitionItem("newAction", bizDataDef.getCreatorAction());
		if (!DataUtils.isStringEmpty(bizDataDef.getDataModel()))
			definition += "," + bizDataDef.getDefinitionItem("dataModel", bizDataDef.getDataModel());
		if (!DataUtils.isStringEmpty(bizDataDef.getDataType()))
			definition += "," + bizDataDef.getDefinitionItem("dataType", bizDataDef.getDataType());
		String s = "{'" + bizDataDef.getMainConcept().getName() + "':'" + bizDataDef.getMainConcept().getAlias() + "'}";
		definition += "," + bizDataDef.getDefinitionItem("concept", s);
		definition += "," + bizDataDef.getDefinitionItem("limit", bizDataDef.getLimit(), "int");
		s = getidColumnDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("idColumn", s);
		s = bizDataDef.isDirectDelete() ? "true" : "false";
		definition += "," + bizDataDef.getDefinitionItem("directDelete", s, "boolean");
		s = bizDataDef.isDeleteConfirm() ? "true" : "false";
		definition += "," + bizDataDef.getDefinitionItem("deleteConfirm", s, "boolean");
		s = bizDataDef.getDeleteConfirmText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("deleteConfirmText", s);
		s = bizDataDef.isRefreshConfirm() ? "true" : "false";
		definition += "," + bizDataDef.getDefinitionItem("refreshConfirm", s, "boolean");
		s = bizDataDef.getRefreshConfirmText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("refreshConfirmText", s);
		s = bizDataDef.getFilterRelations();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("filterRelations", s);
		s = bizDataDef.getUpdateMode();
		definition += "," + bizDataDef.getDefinitionItem("updateMode", !DataUtils.isStringEmpty(s) ? s : BizDataUtils.UPDATEMODE_WHEREVERSION);
		s = getOrderByDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("orderBys", s);
		s = getFiltersDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("filters", s);
		s = getRelationDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("defRelations", s);
		s = getCalcRelationDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("defCalcRelations", s);
		s = getAggDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("defAggRelations", s);
		s = getDefaultValueDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("defaultValues", s);
		s = getMasterDataDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("masterData", s);
		s = getTreeDefinitionText();
		if (!DataUtils.isStringEmpty(s))
			definition += "," + bizDataDef.getDefinitionItem("treeOption", s);
		definition += "}";

		boolean autoLoad = bizDataDef.isAutoLoad();
		boolean autoNew = bizDataDef.isAutoNew();
		if (autoLoad && autoNew) {
			throw XBLException.create(UISystemMessages.XBL_BIZDATA_AUTO_DEFINE_ERROR, dataId);
		}
		String events = bizDataDef.getEvents();

		//获取操作相关
		@SuppressWarnings("unchecked")
		List<Element> ops = (List<Element>) this.dataDef.selectNodes("//*[local-name(.) = 'operation']");
		JSONObject jsOps = new JSONObject();
		try {
			for (Iterator<Element> iter = ops.iterator(); iter.hasNext();) {
				Element op = iter.next();
				String name = op.attribute("name").getValue();
				JSONObject jsOp = new JSONObject();
				//label
				if (op.attribute("label") != null) {
					String label = op.attribute("label").getValue();
					if (label != null)
						jsOp.put("label", label);
				}

				//img-src
				if (op.attribute("img-src") != null) {
					String imgSrc = op.attribute("img-src").getValue();
					if (imgSrc != null)
						jsOp.put("imgSrc", imgSrc);
				}

				//dis-src
				if (op.attribute("dis-src") != null) {
					String disSrc = op.attribute("dis-src").getValue();
					if (disSrc != null)
						jsOp.put("disSrc", disSrc);
				}

				//enable
				if (op.attribute("enable") != null) {
					String enable = op.attribute("enable").getValue();
					if (enable != null)
						jsOp.put("enable", !enable.equals("false"));
				}

				//visible
				if (op.attribute("visible") != null) {
					String visible = op.attribute("visible").getValue();
					if (visible != null)
						jsOp.put("visible", !visible.equals("false"));
				}

				//success-hint
				if (op.attribute("success-hint") != null) {
					String success = op.attribute("success-hint").getValue();
					if (success != null)
						jsOp.put("successHint", success);
				}

				jsOps.put(name, jsOp);
			}
		} catch (JSONException e) {
			throw XBLException.create(e, UISystemMessages.XBL_BIZDATA_DEFINE_ERROR, dataId, e.getMessage());
		}

		String script = "new justep.XBizData('" + this.dataId + "'," + (autoLoad ? "true," : "false,") + (autoNew ? "true," : "false,") + definition
				+ ",'" + this.partId + "'," + jsOps.toString() + ")" + (!DataUtils.isStringEmpty(events) ? ".attachEvents(" + events + ")" : "")
				+ ";";
		Element scriptE = DataUtils.createXHTMLScript(script);
		Element headE = DocumentHelper.createElement(DataUtils.INHEAD_QNAME);
		this.rootE.add(headE);
		if (null != headE) {
			headE.add(scriptE);
		}
	}

	private String getMasterDataDefinitionText() {
		//		 *  masterData : "{'id':'data id','relation':'relation name','autoLoad':true}"
		Element masterDefE = bizDataDef.getMasterDef();
		if (null != masterDefE) {
			String data = masterDefE.attributeValue("data");
			String relation = masterDefE.attributeValue("relation");
			if (DataUtils.isStringEmpty(data) || DataUtils.isStringEmpty(relation))
				return null;
			return "{'id':'" + data + "','relation':'" + relation + "','autoLoad':" + (bizDataDef.isAutoLoadSlaveData() ? "true" : "false") + "}";
		} else
			return null;
	}

	private String getDefaultValueDefinitionText() {
		//{'relation别名' : '默认值',...}
		String result = "";
		for (Iterator<String> iter = this.relationDefaultValues.keySet().iterator(); iter.hasNext();) {
			String str = iter.next();
			String value = this.relationDefaultValues.get(str);
			if (!DataUtils.isStringEmpty(value)) {
				value = value.replaceAll("'", "\\\\\\\\'").replaceAll("\"", "\\\\\"");
			} else
				value = "";
			result += (!"".equals(result) ? "," : "") + "'" + str + "':'" + value + "'";
		}
		return DataUtils.isStringEmpty(result) ? null : "{" + result + "}";
	}

	private String getOrderByDefinitionText() {
		//		 *  orderBys : "{'relation':0,'relation':1}",
		String orderBy = bizDataDef.getOrderByDef();
		if (!DataUtils.isStringEmpty(orderBy)) {
			String[] orderBys = orderBy.split(",");
			String result = "{";
			for (int i = 0; i < orderBys.length; i++) {
				String s = orderBys[i];
				String[] s1 = s.split(":");
				if (s1.length <= 1)
					s1 = s.split(" ");
				result += (!"{".equals(result) ? "," : "") + "'" + s1[0] + "':" + (s1.length <= 1 ? "1" : "desc".equalsIgnoreCase(s1[1]) ? "0" : "1");
			}
			return result + "}";
		} else
			return "{}";
	}

	private String getidColumnDefinitionText() throws XBLException {
		QRelation r = bizDataDef.getIdColumn();
		if (null != r) {
			String result = "{" + "'name':'" + r.getAlias() + "','relation':'" + BizDataUtils.getQRelationFullName(r) + "','define':'"
					+ BizDataUtils.getQRelationDefine(r) + "','type':'" + bizDataDef.getRelationDataType(r) + "'}";
			return result;
		} else
			return "";
	}

	private String getFiltersDefinitionText() {
		//		 *  filters : "{'filterID':filter,...}",
		String result = "";
		List<Element> filterEs = bizDataDef.getFilterDefList();
		for (Element filterE : filterEs) {
			String name = filterE.attributeValue("name");
			String text = filterE.getTextTrim();
			if (!DataUtils.isStringEmpty(text)) {
				text = text.replaceAll("'", "\\\\\\\\'").replaceAll("\"", "\\\\\"");
			}
			if (!DataUtils.isStringEmpty(name)) {
				result += (!"".equals(result) ? "," : "") + "'" + name + "':'" + text + "'";
			}
		}
		return DataUtils.isStringEmpty(result) ? null : "{" + result + "}";
	}

	private String getRelationDefinitionText() {
		//		 *  defRelations : "{'relation 别名':{'type 类型':'http://www.w3.org/2001/XMLSchema#string','relation 名':'p.sName'}}",
		return !DataUtils.isStringEmpty(this.relationDefinitionText) ? "{" + this.relationDefinitionText + "}" : null;
	}

	private String getCalcRelationDefinitionText() {
		//		 *  defCalcRelations : "{'计算relation 别名':{'type 类型':'http://www.w3.org/2001/XMLSchema#string'}}",
		return !DataUtils.isStringEmpty(this.calcRelationDefinitionText) ? "{" + this.calcRelationDefinitionText + "}" : null;
	}

	private String getAggDefinitionText() {
		//		 *  defAggRelations : "{'统计relation 别名':realtion}",
		String result = "";
		List<QRelation> aggs = bizDataDef.getAction().getKql().getAggregateRelationList();
		for (QRelation agg : aggs) {
			result += (!DataUtils.isStringEmpty(result) ? ",'" : "'") + agg.getAlias() + "':'EXPRESS'";
		}
		return DataUtils.isStringEmpty(result) ? null : "{" + result + "}";
	}

	private String getTreeDefinitionText() {
		////treeOption : "{'isDelayLoad':true,'parentRelation':'父子关联的relation','virtualRootLabel':'','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}"
		String result = null;
		if (BizDataUtils.isTreeData(dataDef)) {
			String rootFilter = BizDataUtils.getTreeRootFilter(dataDef);
			if (!DataUtils.isStringEmpty(rootFilter)) {
				rootFilter = rootFilter.replaceAll("'", "\\\\\\\\'").replaceAll("\"", "\\\\\"");
			}
			String parentPath = BizDataUtils.getParentPath(dataDef);
			String childrenPath = BizDataUtils.getChildrenPath(dataDef);
			String nodeKindPath = BizDataUtils.getNodeKindPath(dataDef);
			String nodeLevelPath = BizDataUtils.getNodeLevelPath(dataDef);
			String virtualRootLabel = BizDataUtils.getVirtualRootLabel(dataDef);
			//			(!DataUtils.isStringEmpty(nodeKindPath))
			//			(!DataUtils.isStringEmpty(nodeLevelPath))
			//			(!DataUtils.isStringEmpty(virtualRootLabel))
			boolean b = BizDataUtils.isDelayLoad(dataDef);
			result = "{'isDelayLoad':" + (b ? "true" : "false")
					+ (!DataUtils.isStringEmpty(parentPath) ? (",'parentRelation':'" + parentPath + "'") : "")
					+ (!DataUtils.isStringEmpty(childrenPath) ? (",'childrenRelation':'" + childrenPath + "'") : "")
					+ (!DataUtils.isStringEmpty(virtualRootLabel) ? (",'virtualRootLabel':'" + virtualRootLabel + "'") : "")
					+ (!DataUtils.isStringEmpty(rootFilter) ? (",'rootFilter':'" + rootFilter + "'") : "")
					+ (!DataUtils.isStringEmpty(nodeKindPath) ? (",'nodeKindRelation':'" + nodeKindPath + "'") : "")
					+ (!DataUtils.isStringEmpty(nodeLevelPath) ? (",'nodeLevelRelation':'" + nodeLevelPath + "'") : "") + "}";
		}
		return result;
	}
}
