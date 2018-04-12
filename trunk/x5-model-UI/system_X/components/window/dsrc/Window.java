import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.xml.transform.TransformerConfigurationException;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Namespace;
import org.dom4j.Node;
import org.dom4j.QName;
import org.dom4j.io.SAXReader;

import com.justep.design.model.kql.QRelation;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.ui.LanguageEngine;
import com.justep.ui.resources.ResourceManagerWrapper;
import com.justep.ui.resources.URLFactory;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.system.component.data.DataDef;
import com.justep.ui.system.component.data.DataUtils;
import com.justep.ui.system.component.data.bizdata.BizDataDef;
import com.justep.ui.system.component.window.FileHelper;
import com.justep.ui.system.component.window.XHTMLFactory;
import com.justep.ui.util.PageUtils;
import com.justep.ui.xml.XMLConstants;
import com.justep.ui.xml.dom4j.Dom4jUtils;
import com.justep.util.xls.ExcelConvert;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.URLConvert;
import com.justep.xbl.runtime.XBLException;

/**
 * @author hcr
 *
 */
public class Window implements JavaTemplate {
	private static Document VIEW_TEMPLATE = null;
	private static final String VIEW_TEMPLATE_FILE = "oxf:/UI/system/components/window/viewTemplate.xml";
	//private static final String XSLT_FILE = "oxf:/UI/system/components/window/formTransformer.xsl";

	//private static final String MAIN_MODEL = "mainmodel";	

	//private static final String WINDOW_ELEMENT = "window";	
	private static final String MODEL_ELEMENT = "model";
	//private static final String DATA_ELEMENT = "data";
	private static final String VIEW_ELEMENT = "view";
	private static final String RESOURCE_ELEMENT = "resource";
	private static final String LAYOUT_ELEMENT = "layout";
	private static final String PLACE_ELEMENT = "place";
	private static final String CONTROL_ATTRIBUTE = "control";
	private static final String CONTROL_LABEL_ATTRIBUTE = "control-label";

	private static final String INHEAD_ELEMENT = "inhead";
	private static final String INBODY_ELEMENT = "inbody";

	private static final String AUTO_LOAD_ATTRIBUTE = "auto-load";

	private static final String ONLOAD = "system.event.onload";

	//TODO 被删除：window原来支持customviewTemplate
	//TODO 被删除：setPageBackground， 设置背景, wxm

	static {

		VIEW_TEMPLATE = getViewTemplate();
	}

	public Element execute(Element bound, Map context) throws XBLException {
		Document xformsDocument = processWindow(bound, context);
		Element html = xformsDocument.getRootElement();
		html.getDocument().remove(html);
		Element root = DocumentHelper.createElement("root");
		root.add(html);
		//WindowUtils.processData(context);

		return root;
	}

	private Document processWindow(Element window, Map context) throws XBLException {
		Document template = (Document) VIEW_TEMPLATE.clone();
		Element head = (Element) template.selectSingleNode("/xhtml:html/xhtml:head");
		Element body = (Element) template.selectSingleNode("/xhtml:html/xhtml:body");

		//处理sys-param
		String hasSysParam = window.attributeValue("sys-param");
		if (hasSysParam == null) {
			//兼容之前的load-model
			hasSysParam = window.attributeValue("load-model");
		}
		if (hasSysParam != null) {
			template.getRootElement().addAttribute("sys-param", hasSysParam);
		}

		//处理session-timeout
		String sessionTimeOut = window.attributeValue("timeout-window");
		if (sessionTimeOut != null) {
			template.getRootElement().addAttribute("timeout-window", sessionTimeOut);
		}

		//onload
		String onload = (String) context.get(ONLOAD);
		if (onload != null && !onload.equals("")) {
			body.addAttribute("onload", onload);
		}

		//Element mainModel = (Element)head.selectSingleNode("./xforms:model[@id='" + MAIN_MODEL + "']");
		Element visibleElement = (Element) body.selectSingleNode("./xhtml:div[@id='visible-element']");

		prepare(window, template, context);

		// 处理KORequire
		processKORequire(window, head);

		//处理resource节点
		processResource(window, head, body);

		//处理inhead
		{
			List<Element> befores = new ArrayList<Element>();
			List<Element> afters = new ArrayList<Element>();
			List<Element> inheads = (List<Element>) window.selectNodes("//*[(local-name(.) = '" + INHEAD_ELEMENT + "') and (namespace-uri(.) = '"
					+ XMLConstants.XUI_NAMESPACE_URI + "') ]");
			for (Element item : inheads) {
				String position = item.attributeValue("position");
				if ("before".equalsIgnoreCase(position)) {
					for (Object o : item.elements()) {
						Element e = (Element) o;
						e.getParent().remove(e);
						befores.add(e);
					}
				} else {
					for (Object o : item.elements()) {
						Element e = (Element) o;
						e.getParent().remove(e);
						afters.add(e);
					}
				}

				item.getParent().remove(item);
			}

			head.content().addAll(0, befores);
			head.content().addAll(afters);
		}

		//处理inbody
		{
			List<Element> befores = new ArrayList<Element>();
			List<Element> afters = new ArrayList<Element>();
			List<Element> inbodys = (List<Element>) window.selectNodes("//*[(local-name(.) = '" + INBODY_ELEMENT + "') and (namespace-uri(.) = '"
					+ XMLConstants.XUI_NAMESPACE_URI + "') ]");
			for (Element item : inbodys) {
				String position = item.attributeValue("position");
				if ("before".equalsIgnoreCase(position)) {
					for (Object o : item.elements()) {
						Element e = (Element) o;
						e.getParent().remove(e);
						befores.add(e);
					}
				} else {
					for (Object o : item.elements()) {
						Element e = (Element) o;
						e.getParent().remove(e);
						afters.add(e);
					}
				}

				item.getParent().remove(item);
			}
			body.content().addAll(0, befores);
			body.content().addAll(afters);
		}

		//处理model和xforms:model
		processXFormsModel(window, head);

		/*
		//处理xhtml:script
		processXHTMLScript(window, head);
		
		//处理xforms:instance
		processXFormsInstance(window, mainModel);
		
		//处理xforms:bind
		processXFormsBind(window, mainModel);
		
		//处理xforms:action
		processXFormsAction(window, mainModel);
		*/

		//处理view
		Element rootView = (Element) window.selectSingleNode("//*[(local-name(.) = '" + VIEW_ELEMENT + "') and (namespace-uri(.) = '"
				+ XMLConstants.XUI_NAMESPACE_URI + "') ]");
		if (rootView != null) {
			Element result = processViewLayout(rootView, context);
			if (result != null) {
				visibleElement.add(result);
			}
		}
		/** 处理过滤模式需要的数据 */
		//TODO 被删除 generateFilterPatternData(win);

		/** 生成错误展示对话框 */
		//TODO 被删除 generateErrorReportDialog(win);

		/** 统一处理data引用和Action引用　*/
		//TODO 被删除 transformPathRefer(win);

		//TODO 被删除 processWindowData(win);

		/** 处理其他动作和逻辑 */
		//TODO 被删除 processActions(win);

		/** 处理requests*/
		//TODO 被删除 getRequestsEngine().generateRequests(win);

		/** 处理xui-bind 
		 * 废除这个逻辑，导航数据分离的时候自动同步
		 * LZG edit
		 */
		/**	产生同步操作 */
		//TODO 被删除 getXUIBindEngine().generateXuiBind(win);

		/** 标准动作处理 */
		//TODO 被删除 generateStandardActionImplement(win);

		/** 刷新subwindow事件 */
		//TODO 被删除 generateRefreshSubWindowAction(win);

		return template;
	}

	/*	
		private void processXHTMLScript(Element window, Element head){
			List<Element> scripts = window.elements(new QName("script", XMLConstants.XHTML_NAMESPACE));
			for (Element script : scripts){
				script.getParent().remove(script);
				head.add(script);
			}
		}
	*/

	/*	
		private void processXFormsAction(Element window, Element mainModel){
			List<Element> binds = window.elements(new QName("action", XFormsConstants.XFORMS_NAMESPACE));
			for (Element bind : binds){
				bind.getParent().remove(bind);
				mainModel.add(bind);
			}
	*/
	/*TODO 原来的版本
	List<Element> actions = win.selectNodes("./xforms:action");
	
	Element partDefE = UIRules.getOwnerPart(win); 
	Element parentElement = win!=UIRules.getOwnerWindow(win)?
			PageViewGenerator.getModelOrPart(content, UIRules.getOwnerModelID(win), partDefE):
				PageViewGenerator.getModelOrPart(content, UIRules.getOwnerModelID(UIRules.generateMainData(win)), partDefE);
	if (actions.size() > 0) {
					
		for (Element action : actions) {             
			String event = action.attributeValue(new QName("event", DOMUtil.XMLEVENT_NAMESPACE));				
			if (event != null && !"".equals(event)) {
				String target = action.attributeValue(new QName("target"));
				if (target == null){
					target = action.attributeValue(new QName("target", DOMUtil.XXFORMS_NAMESPACE));
				}
				Element modelAction = null;
				if (target != null && !"".equals(target)){
					modelAction = (Element)parentElement.selectSingleNode("xforms:action[(@ev:event=\"" + event + "\") and (@target=\"" + target + "\")]");
				}else{
					modelAction = (Element)parentElement.selectSingleNode("xforms:action[@ev:event=\"" + event + "\"]");
				}

				if (modelAction == null) {
					modelAction = DOMUtil.createAction(event, null);
					parentElement.add(modelAction);
				}
				
				if (target != null && !"".equals(target)){
					modelAction.addAttribute(new QName("target"), target);
				}
				
				String condition = action.attributeValue(new QName("if"));
				
				if ("".equals(condition)) {
					condition = null;
				}
				
				Element subAction = DOMUtil.createAction(null, condition);
				modelAction.add(subAction);
				
				subAction.content().addAll(action.content());

			
			} else {
				throw new RuntimeException("model中的action必须有ev:event属性。");
			}
			
		}
	}
	
	//获取part
	List<Element> parts = win.elements(new QName("part"));
	for(Element itemE:parts){
		generateModelActions(itemE);
	}
	//获取model
	List<Element> models = win.elements(new QName("model"));
	for(Element itemE:models){
		generateModelActions(itemE);
	}
	*/
	//	}

	/*
		private void processXFormsBind(Element window, Element mainModel){
			List<Element> binds = window.elements(new QName("bind", XFormsConstants.XFORMS_NAMESPACE));
			for (Element bind : binds){
				bind.getParent().remove(bind);
				mainModel.add(bind);
			}
	*/
	/*TODO 原来的版本
	if(e==null) return;
	List<Element> binds = e.selectNodes("./xforms:bind");
	
	Element parentElement = null;
	Element partDefE = UIRules.getOwnerPart(e); 
	if(e==UIRules.getOwnerWindow(e))
		if(!UIRules.isStringEmpty(UIRules.getMainDataName(e)))
			parentElement = PageViewGenerator.getModelOrPart(content, UIRules.getMainModelID(e), partDefE);
		else
			parentElement = PageViewGenerator.getModelOrPart(content, "", partDefE);
	else
		parentElement = PageViewGenerator.getModelOrPart(content, UIRules.getOwnerModelID(e), partDefE);
	
	if (parentElement!=null && binds.size() > 0) {
		for (Element bind : binds) {
			parentElement.add((Element)bind.clone());
		}
	}
	
	//获取part
	List<Element> parts = e.elements(new QName("part"));
	for(Element itemE:parts){
		cloneModelBinds(itemE);
	}
	//获取model
	List<Element> models = e.elements(new QName("model"));
	for(Element itemE:models){
		cloneModelBinds(itemE);
	}
	*/
	//	}

	/*
	private void processXFormsInstance(Element window, Element mainModel){
		List<Element> instances = window.elements(new QName("instance", XFormsConstants.XFORMS_NAMESPACE));
		for (Element instance : instances){
			instance.getParent().remove(instance);
			mainModel.add(instance);
		}
	}
	*/

	private void processXFormsModel(Element window, Element head) throws XBLException {
		List<Element> models = (List<Element>) window.selectNodes("./*[local-name(.) = '" + MODEL_ELEMENT + "' and namespace-uri(.) = '"
				+ XMLConstants.XFORMS_NAMESPACE_URI + "']");
		for (Element model : models) {
			model.getParent().remove(model);
			head.add(model);
			/*
			String modelID = model.attributeValue(new QName("id"));
			if (modelID != null){
				List<Element> scripts = model.selectNodes(".//xhtml:script");
				for (Element script : scripts){
					script.getParent().remove(script);
					head.add(script);
				}
				
				model.getParent().remove(model);
				
				Element modelCopy = head.addElement(new QName(MODEL_ELEMENT, XFormsConstants.XFORMS_NAMESPACE));
				modelCopy.addAttribute(new QName("id"), modelID);
				modelCopy.content().addAll(model.content());
				
			}else{
				throw new XBLException("model元素必须有id属性!" + model.asXML());
			}
			*/
		}
	}

	private Element processViewLayout(Element view, Map context) throws XBLException {
		Element layout = getViewLayout(view, context);

		List<Element> controlPlaces = new ArrayList<Element>();
		List<Element> labelPlaces = new ArrayList<Element>();
		List<Element> places = layout.selectNodes(".//*[local-name(.)='" + PLACE_ELEMENT + "' and namespace-uri(.) = '"
				+ XMLConstants.XUI_NAMESPACE_URI + "']");
		for (Element place : places) {
			String controlAttr = place.attributeValue(new QName(CONTROL_ATTRIBUTE));
			String controlLabelAttr = place.attributeValue(new QName(CONTROL_LABEL_ATTRIBUTE));
			if (controlAttr != null) {
				controlPlaces.add(place);

			} else if (controlLabelAttr != null) {
				labelPlaces.add(place);

			} else {
				throw XBLException.create(UISystemMessages.class, UISystemMessages.XBL_WINDOW_PLACE_ERROR, CONTROL_LABEL_ATTRIBUTE,
						CONTROL_ATTRIBUTE, place.asXML());
			}
		}

		//处理control-label
		for (Element place : labelPlaces) {
			String controlLabelAttr = place.attributeValue(new QName(CONTROL_LABEL_ATTRIBUTE));
			Element control = (Element) view.selectSingleNode(".//*[@id='" + controlLabelAttr + "']");
			if (control != null) {
				String labelValue = place.attributeValue(new QName("label"));
				if (labelValue == null) {
					labelValue = getControlLabel(control, context);
				}
				Element result = DocumentHelper.createElement(new QName("label", XMLConstants.XHTML_NAMESPACE));
				result.addText(labelValue);
				combineStyle(result, place);
				XHTMLFactory.replaceElement(place, result);

			} else {
				throw XBLException.create(UISystemMessages.class, UISystemMessages.XBL_WINDOW_PLACE_LABEL_NOT_EXIST, CONTROL_LABEL_ATTRIBUTE,
						controlLabelAttr, place.asXML());
			}

		}

		String layoutType = layout.attributeValue(new QName("type"));
		//处理control
		for (Element place : controlPlaces) {
			String controlAttr = place.attributeValue(new QName(CONTROL_ATTRIBUTE));
			Element control = (Element) view.selectSingleNode("./*[@id='" + controlAttr + "']");
			if (control != null) {
				Element result = null;
				if ("view".equals(control.getName()) && XMLConstants.XUI_NAMESPACE_URI.equals(control.getNamespaceURI())) {
					result = processViewLayout(control, context);
				} else {
					result = processControlView(control);
				}

				combineStyle(result, place);

				if (layoutType != null && layoutType.contains("excel")) {//zmh 修改excel布局为cell.excel,但兼容以前的excel命名
					addAutoFillClass(result);
				}

				XHTMLFactory.replaceElement(place, result);

			} else {
				throw XBLException.create(UISystemMessages.class, UISystemMessages.XBL_WINDOW_PLACE_NOT_EXIST, controlAttr, place.asXML());
			}
		}

		Element result = DocumentHelper.createElement(new QName("div", XMLConstants.XHTML_NAMESPACE));
		String autoLoad = view.attributeValue(AUTO_LOAD_ATTRIBUTE);
		if (autoLoad != null) {
			String lazy = "true";
			if (autoLoad.trim().equals("true")) {
				lazy = "false";
			} else {

			}
			result.addAttribute(new QName("lazy", XMLConstants.XFORMS_NAMESPACE), lazy);
		}

		String id = view.attributeValue("id");
		if (id != null) {
			result.addAttribute(new QName("id"), id);
		}

		String classesAttr = view.attributeValue("class");
		if (classesAttr != null) {
			classesAttr = classesAttr;
		} else {
			classesAttr = "";
		}
		result.addAttribute(new QName("class"), classesAttr);

		String style = layout.attributeValue(new QName("style"));
		/*
		if (style != null){
			style = "width:100%;height:100%;" + style;
		}else{
			style = "width:100%;height:100%;";
		}*/
		if (style != null)
			result.addAttribute(new QName("style"), style);

		//result.appendAttributes(layout);
		//result.content().addAll(layout.elements());

		try {
			//由于ops中有可能产生自已的Element, 导致clone有问题;
			String layoutStr = Dom4jUtils.domToString(layout);
			Element layoutClone = new SAXReader().read(new StringReader(layoutStr)).getRootElement();

			for (Object node : layoutClone.content()) {
				if (!(node instanceof Attribute) && !(node instanceof Namespace)) {
					result.add((Node) ((Node) node).clone());
				}
			}
		} catch (Exception e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_UNKNOWN_ERROR, e.getMessage());
		}

		return result;
	}

	private void combineStyle(Element control, Element useControl) {
		String useStyle = useControl.attributeValue(new QName("style"));
		if (useStyle != null) {
			String style = control.attributeValue(new QName("style"));
			if (style == null) {
				control.addAttribute(new QName("style"), useStyle);
			} else {
				control.addAttribute(new QName("style"), style + ";" + useStyle);
			}
		}
	}

	private void addAutoFillClass(Element control) {
		if (control != null) {
			String controlClass = control.attributeValue(new QName("class"));
			if (controlClass == null) {
				control.addAttribute(new QName("class"), "xui-autofill");
			} else {
				if (!controlClass.contains("xui-autofill")) {
					control.addAttribute(new QName("class"), controlClass + " " + "xui-autofill");
				}
			}
		}
	}

	/*
	private List processLayout(Element layoutContainer, Map context, Element window)throws XBLException{
		Element layout = getLayout(layoutContainer, context);
		//String layoutType = layout.attributeValue(new QName("type"));
		generateControlLabel(layout, window, context);
		processLayoutObject(layout, context, window);
		
		return layout.elements();
	}
	*/

	/*
	private void generateControlLabel(Element layout, Element window, Map context){
		generateCommonControlLabel(layout, window, context);
		//TODO 被删除 generateGridControlLabel(layoutContainer);		
	}
	*/

	/**
	 * 处理object-label 
	 * 具体实现是
	 * 		得到object-label的id，根据id得到control节点; 
	 * 如果control上的label有属性, label优先; 否则获取relation, 根据relation获取label; 否则返回为"";
	 */
	/*
	private void generateCommonControlLabel(Element layout, Element window, Map context)  {
		List<Element> allObjectLabels = getRefObjectLabelsInLayout(layout);
		for (Element objectLabel : allObjectLabels) {
			String controlID = objectLabel.attributeValue(new QName("path"));
			
			Element controlE = (Element)window.selectSingleNode("//*[@id='" + controlID + "']");
			if (controlE != null) {
				String label = getControlLabel(controlE, context);
				XHTMLFactory.replaceElement(objectLabel, DocumentHelper.createText(label));
			} else {
				throw new RuntimeException("无效的object-label path: " + objectLabel.asXML());
			}
		}
	}
	*/

	private String getControlLabel(Element controlE, Map context) {
		String label = controlE.attributeValue(new QName("label"));
		if (label == null) {
			String ref = controlE.attributeValue(new QName("ref"));
			if (ref != null) {
				String data = controlE.attributeValue(new QName("data"));
				label = getRefLabel(data, ref.trim(), context);
			}
		}

		return (label == null) ? "" : label;
	}

	private String getRefLabel(String data, String ref, Map context) {
		String dataID = null;
		String relation = null;
		if (data != null && ref.indexOf("/") == -1) {
			dataID = data.trim();
			relation = ref.trim();

		} else {
			String[] items = ref.split("/");
			for (int i = 0; i < items.length; i++) {
				String tmp = items[i].trim();
				if (!tmp.equals("")) {
					int start = tmp.indexOf("'");
					int end = tmp.lastIndexOf("'");
					if ((start != -1) && (start != (tmp.length() - 1)) && (end != -1)) {
						dataID = tmp.substring(start + 1, end);
					}
					break;
				}
			}

			if (dataID == null) {
				return null;
			}

			for (int i = items.length - 1; i >= 0; i--) {
				String tmp = items[i].trim();
				if (!tmp.equals("")) {
					relation = tmp;
					break;
				}
			}

			if (relation == null) {
				return null;
			}
		}

		String result = relation;

		DataDef dataDef = DataUtils.getDataDef(dataID, context);
		if (dataDef != null && (dataDef instanceof BizDataDef)) {
			BizDataDef bizDataDef = (BizDataDef) dataDef;
			QRelation r = bizDataDef.getRelationRef(relation);
			if (null != r) {
				String label = r.getLabel();
				if (!DataUtils.isStringEmpty(label))
					result = label;
			}
		}
		return result;
	}

	/*
	private List<Element> getRefObjectLabelsInLayout(Element layout) {
		return layout.selectNodes(".//*[local-name(.)='object-label' and namespace-uri(.) = '" + XMLConstants.XUI_NAMESPACE_URI + "']");
	}
	*/

	/*
	//wxm 处理control（view、subwindow）引用
	private void processLayoutObject(Element layout, Map context, Element window) throws XBLException{
		for (Element object : (List<Element>)layout.elements()) {
			if ("object".equals(object.getName()) && XMLConstants.XUI_NAMESPACE_URI.equals(object.getNamespaceURI())) {
				String refPath = object.attributeValue(new QName("path"));
				//String refRelation = object.attributeValue(new QName("relation"));
				
				if (refPath != null) {
					Element objectElement = (Element)window.selectSingleNode("//*[@id='" + refPath + "']");
					
					if (objectElement != null) {
						if ("view".equals(objectElement.getName()) && XMLConstants.XUI_NAMESPACE_URI.equals(objectElement.getNamespaceURI())) {
							List viewLayout = processLayout(objectElement, context, window);
							XHTMLFactory.replaceElement(object, viewLayout);
							
	//							if(this.isCustomViewTemplate){
	//								PageViewGenerator.replaceXSLElement(content, object, viewLayout);	
	//							}else{
	//								PageViewGenerator.replaceElement(object, viewLayout);
	//							}
	//							
						} else {//if ("control".equals(objectTag)) {
							List objectChilds = object.elements(); 
							if (objectChilds.size() > 0) {
								processLayoutObject(object, context, window);
							}

							Element realControl = generateControlView(objectElement);
							
	//							
	//							// 去除子 control
	//							List childs = realControl.selectNodes("descendant::control");
	//							if (childs.size() > 0) {
	//								for (Element child : (List<Element>)childs) {
	//									child.getParent().remove(child);
	//								}
	//							}
	//							
	//							// 嵌入子 control 引用
	//							if (objectChilds.size() > 0) {
	//								Element firstChild = (Element)realControl.elements().get(0);
	//								if (firstChild != null) {
	//									firstChild.content().addAll(object.content());
	//								}
	//							}
	//							
	//							// 合并style
	//							generateControlStyle(realControl, object);
	//							
	//							// 对excel布局内的组件设置自动调整
	//							
	//							if (layoutType != null && "excel".equals(layoutType)) {
	//								generateAutosizeControl(realControl);
	//							}
	//								
	//							List controlView = realControl.content();
	//							
	//							if (controlView != null) {
	//								for (Node node : (List<Node>)controlView) {
	//									if (node.getNodeType() == 1) {
	//										Element elmt = (Element)node;
	//										generateRandomId(elmt);
	//									}
	//								}
	//							}
	//							
							
							
							XHTMLFactory.replaceElement(object, realControl);//controlView
						//} else {
						//	throw new RuntimeException("不支持的引用类型： " + object.asXML());
						}
					} else {
						throw new RuntimeException("找不到符合指定路径的control、view或subwindow： " + object.asXML());
					}
					
					
	//				} else if (refRelation != null) {
	//					String layoutTag = layoutContext.getName();
	//					
	//					if (!"window".equals(layoutTag) && !"subwindow".equals(layoutTag) && !"view".equals(layoutTag)) {
	//						Element contextParent = layoutContext.getParent();
	//						while (contextParent != null) {
	//							if ("window".equals(contextParent.getName()) || 
	//								"subwindow".equals(contextParent.getName()) || 
	//								"view".equals(contextParent.getName())) {
	//								layoutTag = contextParent.getName();
	//								break;
	//							}
	//							contextParent = contextParent.getParent();
	//						}
	//					}
	//					
	//					if ("view".equals(layoutTag)) {
	//						boolean bFound = false;
	//						
	//						List viewControls = layoutContext.selectNodes("descendant::control");
	//						
	//						for (Element control : (List<Element>)viewControls) {
	//							final String relationName = getControlRelationOrConcept(control);
	//							
	//							if (refRelation.equals(relationName)) {
	//								List objectChilds = object.elements();
	//								
	//								// 去除子 control
	//								Element realControl = generateControlView(layoutWindow, control);
	//								List childs = realControl.selectNodes("descendant::control");
	//								if (childs.size() > 0) {
	//									for (Element child : (List<Element>)childs) {
	//										child.getParent().remove(child);
	//									}
	//								}
	//								
	//								// 嵌入子 control 引用
	//								if (objectChilds.size() > 0) {
	//									Element firstChild = (Element)realControl.elements().get(0);
	//									if (firstChild != null) {
	//										firstChild.content().addAll(object.content());
	//									}
	//								}
	//								
	//								// 合并style
	//								generateControlStyle(realControl, object);
	//								// 对excel布局内的组件设置自动调整
	//								if (layoutType != null && "excel".equals(layoutType)) {
	//									generateAutosizeControl(realControl);
	//								}
	//								
	//								List controlView = realControl.content();
	//								
	//								if (controlView != null) {
	//									for (Node node : (List<Node>)controlView) {
	//										if (node.getNodeType() == 1) {
	//											Element elmt = (Element)node;
	//											generateRandomId(elmt);
	//											generateControlChildren(layoutWindow, elmt);//gyj
	//										}
	//									}
	//								}
	//								
	//								PageViewGenerator.replaceElement(object, controlView);
	//
	//								bFound = true;
	//								break;
	//							}
	//						}
	//						
	//						if (!bFound) {
	//							throw new RuntimeException("找不到 object relation 对应的 control： " + object.asXML());
	//						}
	//					} else {
	//						throw new RuntimeException("只有在 view 的 layout 内才可以使用 object 的 relation 属性引用 control： " + object.asXML());
	//					}
				} else {
					throw new RuntimeException("缺少属性 path ： " + object.asXML());
				}
				
			} else {
				if (object.elements().size() > 0) {
					processLayoutObject(object, context, window);
				}
			}
		}
	}
	*/

	/*
	private void generateRandomId(Element elmt) {
		if (elmt != null) {
			if ("$randomId".equals(elmt.attributeValue(new QName("id")))) {
				elmt.addAttribute(new QName("id"), UUID.randomUUID().toString());
			}
			
			for (Element child : (List<Element>)elmt.elements()) {
				generateRandomId(child);
			}
		}
	}	
	*/

	/**
	 * @param control
	 */
	/*
	//wxm 为组件设置自适应属性（Excel布局内） 
	private void generateAutosizeControl(Element control) {
		if (control != null ) {
			if(null==control.attribute(new QName("auto-size")))
				control.addAttribute(new QName("auto-size"), "true");
			
			//for (Element xc : (List<Element>)control.elements()) {
				//lzg 增加auto-size 属性判断，如果已经存在不设置
			//	if(null==xc.attribute(new QName("auto-size")))
			//		xc.addAttribute(new QName("auto-size"), "true");
			//}
			
		}
	}
	*/

	private Element processControlView(Element control) {
		control.getParent().remove(control);
		return control;
	}

	private String getLayoutFilePath(String src, String windowURL) throws XBLException {
		String result = FileSystemWrapper.getParentFile(windowURL) + "/" + src;
		if (URLConvert.isExist(result)) {
			return result;

		} else {
			String parentFileURL = getParentWindowURL(windowURL);
			if (parentFileURL != null) {
				return getLayoutFilePath(src, parentFileURL);
			} else {
				throw XBLException.create(UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_FILE_NOT_EXIST, src);
			}
		}
	}

	private String getParentWindowURL(String windowURL) {
		try {
			SAXReader reader = new SAXReader();
			Document doc = reader.read(ResourceManagerWrapper.instance().getContentAsStream(windowURL));
			Node node = doc.selectSingleNode("/window/@extends");
			if (node != null) {
				String value = node.getText();
				if (URLConvert.isRelativePath(value)) {
					return FileSystemWrapper.getParentFile(windowURL) + "/" + value;
				} else {
					return value;
				}
			} else {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
	}

	private Element getViewLayout(Element container, Map context) throws XBLException {
		Element layout = container.element(new QName(LAYOUT_ELEMENT, XMLConstants.XUI_NAMESPACE));
		if (layout != null) {
			String src = layout.attributeValue(new QName("src"));
			if (src != null) {
				if (URLConvert.isRelativePath(src)) {
					src = getLayoutFilePath(src, (String) context.get(PageUtils.WINDOW_FILE_URL));
				}

				/*
				//wxm 多语言处理
				if (language != null) {
					File f = new File(strFile);
					String fPath = f.getParent();
					String fName = f.getName();
					String languageFile = fPath + "/" + UIUtil.LANGUAGE_DIR + "/" + language + "/" + fName;
					if (new File(languageFile).exists()) {
						strFile = languageFile;
					}
				}
				*/

				Element result = getLayout2(src, context);
				result.appendAttributes(layout);
				LanguageEngine.execute(result, LanguageEngine.getLayoutPropertiesFile(src, (String) context.get("system.language")));
				return result;
			} else {
				layout.getParent().remove(layout);
				return layout;

			}
		} else {
			/** UI中无设置 生成默认的UI布局 */
			String name = container.getName();
			String namespace = container.getNamespaceURI();
			if (name.equals(VIEW_ELEMENT) && XMLConstants.XUI_NAMESPACE_URI.equals(namespace)) {
				return createDefaultViewLayout(container);
			} else {
				throw XBLException.create(UISystemMessages.class, UISystemMessages.XBL_WINDOW_DEFAULT_LAYOUT_ERROR, container.getQName().toString());
			}
			/*
			if (name.equals(WINDOW_ELEMENT) && XMLConstants.XUI_NAMESPACE_URI.equals(namespace)){ 
				return createDefaultWindowLayout(container);
			}else if (name.equals(VIEW_ELEMENT) && XMLConstants.XUI_NAMESPACE_URI.equals(namespace)){
				return createDefaultViewLayout(container);
			}else{
				throw new XBLException("Window文件不合语法[" + name + "中不支持默认布局]");
			}
			*/
		}
	}

	/*
	private static String getCacheDir(Map context){
		String windowURL = (String)context.get(PageUtils.WINDOW_FILE_URL);
		int index = windowURL.lastIndexOf("/");
		if (index == -1){
			index = windowURL.lastIndexOf("\\");
		}
		
		return windowURL.substring(0, index) + "/.cache"; 
	}
	*/

	/**
	 * 布局文件处理 
	 * @param file   layout 文件 
	 * @return
	 */
	private static Element getLayout2(String file, Map context) throws XBLException {
		String windowURL = (String) context.get(PageUtils.WINDOW_FILE_URL);
		String basePath = new File(ResourceManagerWrapper.instance().getRealPath(windowURL)).getParent() + "/.cache";
		file = ResourceManagerWrapper.instance().getRealPath(file);
		File f = new File(file);
		//String basePath = f.getParent() + "/.cache"; //hcr, excel文件的缓存文件应该相对excel文件更合适，而不是相对w文件
		String cacheFilePath = basePath + "/" + f.getName() + "_" + "$$" + f.lastModified() + ".xml";

		//System.out.println("cache File:"+cacheFilePath); 

		//zmh add 2009-12-25 缓存xls文件的转换结果
		Document doc = FileHelper.getXmlDocument(cacheFilePath);
		if (doc != null) {
			Element rootE = doc.getRootElement();
			doc.remove(rootE);
			return rootE;
		} else {
			removeOutDateFile(cacheFilePath, f.getName() + "_");
		}

		//long t1 = System.currentTimeMillis();
		Element elResult = null;

		try {
			org.dom4j.io.SAXReader reader1 = new org.dom4j.io.SAXReader();
			org.dom4j.Document docSource = reader1.read(new FileInputStream(file));

			String extension = file.substring(file.lastIndexOf(".") + 1);
			//long t2 = System.currentTimeMillis();
			if (extension.equalsIgnoreCase("xls")) {
				/*
				//String filename = ResourceManagerWrapper.instance().getRealPath(URLFactory.createURL(XSLT_FILE).getFile());
				org.dom4j.Document xsltTemplate = reader1.read(ResourceManagerWrapper.instance().getContentAsStream(URLFactory.createURL(XSLT_FILE).getFile()));
				
				org.dom4j.Document docTemplate = (org.dom4j.Document)xsltTemplate.clone();
				org.dom4j.io.DocumentSource xsltSource = new org.dom4j.io.DocumentSource(docTemplate);
				
				org.dom4j.io.DocumentSource sourceStream = new org.dom4j.io.DocumentSource(docSource);
				
				org.dom4j.io.DocumentResult resultStream = new org.dom4j.io.DocumentResult();
				
				TransformerFactory tranformerFactory = TransformerUtils.getFactory(TransformerUtils.SAXON_BUILTIN_TRANSFORMER_TYPE);
				//long t3 = System.currentTimeMillis();
				Templates templates = tranformerFactory.newTemplates(xsltSource);long t31 = System.currentTimeMillis();
				Transformer transformer = templates.newTransformer();
				//long t4 = System.currentTimeMillis();
				transformer.transform(sourceStream, resultStream);
				//long t5 = System.currentTimeMillis();
				ExclHelper.process(resultStream.getDocument());
				elResult = (Element)resultStream.getDocument().getRootElement().clone();
				//long t6 = System.currentTimeMillis();
				//System.out.println("  getLayout2 t6-t5="+(t6-t5)+"  t5-t4="+(t5-t4)+"  t4-t31="+(t4-t31)+"  t3-t2="+(t3-t2)+"  t31-t3="+(t31-t3));
				 
				 */

				ExcelConvert convert = new ExcelConvert();
				elResult = convert.convertToHtml(docSource);

			} else {
				//elResult = DocumentHelper.createElement("layout");
				//elResult.add((Element)docSource.getRootElement().clone());
				elResult = docSource.getRootElement();
				elResult.getDocument().remove(elResult);
			}

			//System.out.println(elResult.asXML());
			FileHelper.writeFile(cacheFilePath, elResult.asXML(), true);
			return elResult;
		} catch (FileNotFoundException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_ERROR);
		} catch (DocumentException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_ERROR);
		} catch (IOException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_ERROR);
		} catch (TransformerConfigurationException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_ERROR);
		} catch (Exception e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_LAYOUT_ERROR);
		}
	}

	private static String getRelaPath(String filePath) {
		int idx = filePath.lastIndexOf("UI");
		if (idx != -1) {
			return filePath.substring(idx + 6);
		}
		return filePath;
	}

	private static void removeOutDateFile(String cacheFile, String fileName) {

		File f = new File(cacheFile).getParentFile();
		File[] fList = f.listFiles();
		if (fList != null) {
			for (File ff : fList) {
				if (ff.getName().startsWith(fileName)) {
					ff.delete();
				}
			}
		}

	}

	private static Element createDefaultViewLayout(Element view) {
		Element layout = DocumentHelper.createElement(new QName(LAYOUT_ELEMENT, XMLConstants.XUI_NAMESPACE));
		createViewControl(view, layout);
		return layout;
	}

	//wxm 根据view内的control生成默认布局
	private static void createViewControl(Element view, Element layout) {
		for (Element child : (List<Element>) view.elements()) {
			Element refControl = createRefenrenceElement(child);
			layout.add(refControl);
			/*
			if ("control".equals(child.getName())) {
				Element refControl = createRefenrenceElement(child);
				layout.add(refControl);
				
				createViewControl(child, refControl);
			} else {
				createViewControl(child, layout);
			}
			 
			 */
		}
	}

	/**
	 * 创建默认的window布局 
	 * @param window  
	 * @return
	 */
	private static Element createDefaultWindowLayout(Element window) {
		Element layout = DocumentHelper.createElement(new QName(LAYOUT_ELEMENT, XMLConstants.XUI_NAMESPACE));
		/** window 元素下的所有 view */
		List<Element> views = window.elements(new QName(VIEW_ELEMENT, XMLConstants.XUI_NAMESPACE));
		for (Element view : views) {
			layout.add(createRefenrenceElement(view));
		}

		return layout;
	}

	/**
	 * <view view='Person-list-view'/>
	 * <tab tab='Person-tab'/>
	 * @param element
	 * @return
	 */
	private static Element createRefenrenceElement(Element element) {
		Element refElement = DocumentHelper.createElement(new QName(PLACE_ELEMENT, XMLConstants.XUI_NAMESPACE));
		refElement.addAttribute(new QName("control"), generateElementID(element));

		return refElement;
	}

	private static String generateElementID(Element element) {
		String id = element.attributeValue(new QName("id"));
		if (id == null) {
			id = UUID.randomUUID().toString();
			element.addAttribute(new QName("id"), id);
		}
		return id;
	}

	private void processKORequire(Element window, Element head) {
		// 排除重复
		List<Element> inits = (List<Element>) window.selectNodes(".//*[local-name(.)='script' and namespace-uri(.) = '"
				+ XMLConstants.XHTML_NAMESPACE_URI + "' and @src='/UI/base/lib/init.js']");
		Element init = null;
		for (int i = inits.size() - 1; i > 1; i--) {
			init = inits.get(i);
			init.getParent().remove(init);
		}

		List<Element> requires = window.selectNodes(".//*[local-name(.)='require']");
		if (requires.size() > 0) {
			StringBuffer sb = new StringBuffer();
			HashSet<String> unique = new HashSet<String>();
			for (Element require : requires) {
				String url = require.attributeValue("url");
				if (!unique.contains(url)) {
					unique.add(url);
					sb.append("\"").append(url).append("\"").append(",");
				}
				require.getParent().remove(require);
			}

			List<Element> resources = window.elements(new QName(RESOURCE_ELEMENT, XMLConstants.XUI_NAMESPACE));
			Element resource = null;
			if (resources.size() > 0) {
				resource = resources.get(resources.size() - 1);
			} else {
				resource = window.addElement(new QName(RESOURCE_ELEMENT, XMLConstants.XUI_NAMESPACE));
			}

			if (inits.size() == 0) {
				init = resource.addElement(new QName("script", XMLConstants.XHTML_NAMESPACE));
				init.addAttribute("src", "/UI/base/lib/init.js");
			} else {
				init = inits.get(0);
			}
			init.addAttribute("loadKO", "true");
			Element script = XHTMLFactory.createXHTMLScript("this.__requireComponents = [" + sb.substring(0, sb.length() - 1) + "];");
			head.add(script);
			//			Element script = resource.addElement(new QName("script", XMLConstants.XHTML_NAMESPACE));
			//			script.addAttribute("type", "text/javascript");
			//			script.addCDATA("butone && butone.Context && (butone.Context.__requireComponents = [" + sb.substring(0, sb.length() - 1) + "])");
		}
	}

	private void processResource(Element window, Element head, Element body) {
		List<Element> resources = window.elements(new QName(RESOURCE_ELEMENT, XMLConstants.XUI_NAMESPACE));

		/*
			  	<!-- 此css 放在最后 留给项目组统一自定义样式 -->
		        <link rel="stylesheet" type="text/css" href="/UI/system/config/user.css"></link>
		 */
		//放在这使得优先级高于组件的样式
		Element userCssLinkE = head.addElement(new QName("link", XMLConstants.XHTML_NAMESPACE));
		userCssLinkE.addAttribute("rel", "stylesheet");
		userCssLinkE.addAttribute("type", "text/css");
		userCssLinkE.addAttribute("href", "/UI/system/config/user.css");

		if (resources.size() > 0) {
			/** 是否重写了 portalClose js 关闭portal处理方法*/
			//boolean isOverRidingPortalClose = false;
			for (Element resource : resources) {
				String at = resource.attributeValue(new QName("at"));
				if ("body".equalsIgnoreCase(at)) {
					addExtendItem(resource, body);
				} else {
					addExtendItem(resource, head);
				}

				/** 
				 * 遍历判断是否重写了portalClose(isNewObj , isChangedObj) JS方法
				 * <xhtml:script id="portalClose" language="javaScript">
				 *		function portalClose(isNewObj , isChangedObj){
				 *   		return false;
				 *   	}
				 *	</xhtml:script>	
				 * */
				/*
				List<Element> childList = resource.elements();
				for (Element child : childList) {
					String id = child.attributeValue(new QName("id"));
					if(id == null || id.equals("")){
						continue;
					}
					if(id.equals("portalClose")){
						isOverRidingPortalClose = true;
					}
				}
				*/

			}

			/** 添加默认的portalClose方法 */
			/*
			if(!isOverRidingPortalClose){
				Element portalCloseElement = XHTMLFactory.createXHTMLScript("function portalClose(isNewObj , isChangedObj){ return 'standard'; }");
				head.add(portalCloseElement);
			}
			*/
		}

	}

	private void addExtendItem(Element extend, Element at) {
		if (extend == null || at == null)
			return;

		List<Element> extendList = extend.elements();
		for (Element extendItem : extendList) {
			extendItem.getParent().remove(extendItem);
			at.add(extendItem);
		}
	}

	private void prepare(Element window, Document template, Map context) {
		copyNamespaces(window, template);
		rewriteURL(window, context);

		//TODO 被删除 rewriteProcess();
		//TODO 被删除 rewriteActionURL();
		//TODO 被删除 initProcessActionList();
	}

	private void rewriteURL(Element window, Map context) {
		String baseURL = getBaseURL(context);
		{
			List<Element> elements = window.selectNodes(".//*[@src!='' and not(local-name(.)='" + LAYOUT_ELEMENT + "' and (namespace-uri(.)='"
					+ XMLConstants.XUI_NAMESPACE_URI + "'))]");
			for (Element e : elements) {
				String srcValue = e.attributeValue(new QName("src"));
				//当src是相对路径时
				if (URLConvert.isRelativePath(srcValue)) {
					srcValue = baseURL + srcValue;
					e.addAttribute(new QName("src"), srcValue);
				}
			}
		}

		{
			List<Element> elements = window.selectNodes(".//*[@href!='' and not(local-name(.)='" + LAYOUT_ELEMENT + "' and (namespace-uri(.)='"
					+ XMLConstants.XUI_NAMESPACE_URI + "'))]");
			for (Element e : elements) {
				String srcValue = e.attributeValue(new QName("href"));
				if (srcValue.startsWith("#") || srcValue.startsWith("javascript:")) {
					continue;
				}
				//当src是相对路径时
				if (URLConvert.isRelativePath(srcValue)) {
					srcValue = baseURL + srcValue;
					e.addAttribute(new QName("href"), srcValue);
				}
			}
		}
	}

	private String getBaseURL(Map context) {
		return FileSystemWrapper.getParentFile((String) context.get(PageUtils.WINDOW_FILE_URL)) + "/";
	}

	private void copyNamespaces(Element window, Document template) {
		List sourceNamespaces = window.getDocument().getRootElement().declaredNamespaces();
		List targetNamespaces = template.getRootElement().declaredNamespaces();

		for (Namespace sourceNamespace : (List<Namespace>) sourceNamespaces) {
			if (!"".equals(sourceNamespace.getPrefix()) && !findNamespace(targetNamespaces, sourceNamespace)) {
				template.getRootElement().declaredNamespaces().add(sourceNamespace);
			}
		}
	}

	private boolean findNamespace(List namespaces, Namespace namespace) {
		for (Namespace ns : (List<Namespace>) namespaces) {
			if (ns.getPrefix().equals(namespace.getPrefix())) {
				return true;
			}
		}

		return false;
	}

	private synchronized static Document getViewTemplate() {
		try {
			if (VIEW_TEMPLATE == null) {
				SAXReader xmlReader = new SAXReader();
				InputStream stream = ResourceManagerWrapper.instance().getContentAsStream(URLFactory.createURL(VIEW_TEMPLATE_FILE).getFile());
				VIEW_TEMPLATE = xmlReader.read(stream);
			}
			return VIEW_TEMPLATE;
		} catch (MalformedURLException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_READ_VIEW_TEMPLATE_ERROR);
		} catch (DocumentException e) {
			throw XBLException.create(e, UISystemMessages.class, UISystemMessages.XBL_WINDOW_READ_VIEW_TEMPLATE_ERROR);
		}

	}

}
