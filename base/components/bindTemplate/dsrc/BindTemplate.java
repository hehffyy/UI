import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Attribute;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.butone.knockout.DataBindUtils;
import com.justep.system.transform.Utils;
import com.justep.ui.exception.UIException;
import com.justep.ui.system.component.ComponentUtils;
import com.justep.ui.xml.XMLConstants;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class BindTemplate implements JavaTemplate {
	private Set<String> relDatas = new HashSet<String>();
	private boolean isList = false;
	private boolean includeCelllayout = false;

	@SuppressWarnings("unchecked")
	public Element execute(Element bound, @SuppressWarnings("rawtypes") Map context) throws XBLException {
		String id = ComponentUtils.getAttributeOfReuired(bound, "id");
		if (context.containsKey(id)) {
			return bound;
		}
		String type = ComponentUtils.getAttributeOfDefault(bound, "type", "flow");
		this.includeCelllayout = bound.selectNodes(".//*[@component='/UI/system/components/cellLayout.xbl.xml#cellLayout']").size() > 0;
		this.isList = "true".equals(ComponentUtils.getAttributeOfDefault(bound, "list", "false"));

		String data = bound.attributeValue("data");
		Element appendTo = bound, foreach = null;
		if (!this.includeCelllayout && this.isList) {
			foreach = DocumentHelper.createElement(new QName("ul", ComponentUtils.XHTML_NAMESPACE));
			String foreachFunc = "$model.foreach_" + id + "($element)";
			String foreachAfterRenderFunc = "$model.foreach_afterRender_" + id + ".bind($model,$element)";
			foreach.addAttribute("data-bind", "foreach: { data: " + foreachFunc + ", afterRender: " + foreachAfterRenderFunc + " }");
			foreach.addAttribute("class", "x-list-template");
			foreach.addAttribute("style", "list-style-type:none;display:none");

			Element styleNode = (Element) bound.getDocument().selectSingleNode("//*[@control='" + id + "']");
			if (styleNode == null)
				styleNode = bound;
			Map<String, String> eachStyle = parseStyleMap(styleNode.attributeValue("style"));
			Map<String, String> fiexStyle = new HashMap<String, String>();
			// 修正list容器样式，只获取位置相关样式
			fiexStyle.put("position", eachStyle.get("position"));
			fiexStyle.put("left", eachStyle.get("left"));
			fiexStyle.put("top", eachStyle.get("top"));
			fiexStyle.put("width", eachStyle.get("width"));
			fiexStyle.put("right", eachStyle.get("right"));
			fiexStyle.put("bottom", eachStyle.get("bottom"));
			fiexStyle.put("float", eachStyle.get("float"));

			// 重复显示的样式
			eachStyle.put("position", "relative");
			eachStyle.remove("left");
			eachStyle.remove("top");
			eachStyle.remove("float");

			Element repeatDiv = foreach.addElement(new QName("li", ComponentUtils.XHTML_NAMESPACE));//listDiv.addElement(new QName("div", ComponentUtils.XHTML_NAMESPACE));
			repeatDiv.addAttribute("style", getStyle(eachStyle));

			Attribute attr = styleNode.attribute("style");
			if (attr == null)
				styleNode.addAttribute("style", getStyle(fiexStyle));
			else
				attr.setText(getStyle(fiexStyle));
			appendTo = repeatDiv;
		}

		Iterator<Element> i = bound.elementIterator();
		while (i.hasNext()) {
			Element ele = i.next();
			Map<String, String> eleStyle = parseStyleMap(ele.attributeValue("style"));
			if ("flow".equals(type)) {
				eleStyle.put("position", "relative");
			} else
				eleStyle.put("position", "absolute");
			if (ele.attribute("style") != null) {
				ele.attribute("style").setText(getStyle(eleStyle));
			} else {
				ele.addAttribute("style", getStyle(eleStyle));
			}
			if (ComponentUtils.XFORMS_NAMESPACE.equals(ele.getNamespace())) {
				// 替换 xforms
				bound.remove(ele);
				Element newEle = parseBindComponent(ele, ele.attributeValue("style"), this.isList || this.includeCelllayout);
				appendTo.add(newEle);
			} else if (ele.getName().equals("view")) {
				// 替换  view
				Element newEle = parseView(ele, this.isList || this.includeCelllayout);
				bound.remove(ele);
				appendTo.add(newEle);
			} else if ("/UI/system/components/cellLayout.xbl.xml#cellLayout".equals(ele.attributeValue("component"))) {
				bound.remove(ele);
				Element newEle = parseCellLayout(ele);
				appendTo.add(newEle);
			} else {
				// 其他
				if (appendTo != bound) {
					// 迁移到循环模板
					appendTo.add(ele.createCopy());
					bound.remove(ele);
				}
			}
		}

		if (foreach != null)
			bound.add(foreach);

		if (Utils.isNotEmptyString(data))
			this.relDatas.add(data);

		if (this.relDatas.size() > 0) {
			StringBuffer sb = new StringBuffer();
			for (String s : this.relDatas) {
				sb.append(s).append(",");
			}
			bound.addAttribute("relDatas", sb.substring(0, sb.length() - 1));
		}

		List<Element> nodes = bound.selectNodes(".//*[@require]");
		for (Element e : nodes) {
			DataBindUtils.parseDataConfig(e, "$model/UI/" + e.attributeValue("require"), true);
		}

		DataBindUtils.parseDataConfig(bound, null, true);
		bound.remove(bound.attribute("component"));
		Element root = bound.createCopy();
		context.put(id, root);
		return root;

	}

	private Element parseBindComponent(Element target, String style, boolean transXform) {
		Element ret = null;
		String cssClass = target.attributeValue("class");
		if (target.getNamespace().equals(ComponentUtils.XFORMS_NAMESPACE) && transXform) {
			String requirePath = "";
			if ("textarea".equals(target.getName())) {
				ret = DocumentHelper.createElement(new QName("textarea", ComponentUtils.XHTML_NAMESPACE));
				requirePath = "base/components/knockout/textarea";
				cssClass = (cssClass == null ? "" : cssClass) + " xui-textarea";
			} else if ("select".equals(target.getName())) {
				ret = createInputLabel(target, "checkbox");
				cssClass = (cssClass == null ? "" : cssClass) + " x-checkbox";
				requirePath = "base/components/knockout/checkbox";
			} else if ("select1".equals(target.getName())) {
				ret = createInputLabel(target, "radio");
				cssClass = (cssClass == null ? "" : cssClass) + " x-radio";
				requirePath = "base/components/knockout/radio";
			} else {
				ret = DocumentHelper.createElement(new QName("input", ComponentUtils.XHTML_NAMESPACE));
				ret.addAttribute("type", "text");
				cssClass = (cssClass == null ? "" : cssClass) + " x-input";
				requirePath = "base/components/knockout/input";
				if (target.getName().equals("output")) {
					ret.addAttribute("readonly", "readonly");
				}
			}
			ret.addAttribute("require", requirePath);
			
			String ref = target.attributeValue("ref");
			String table = "", relation = "";
			if (Utils.isNotEmptyString(ref)) {
				table = ref.substring(ref.indexOf("'") + 1, ref.lastIndexOf("'"));
				this.relDatas.add(table);
				relation = ref.substring(ref.lastIndexOf("/") + 1);
				String bindRef = null;
				if (this.isList || includeCelllayout) {
					bindRef = "ref('" + relation + "')";//$object.
				} else {
					bindRef = table + ".ref('" + relation + "')";//$model.
				}
				ret.addAttribute("bind-ref", bindRef);
			}
			//			else {
			//				// 无ref直接使用input readonly
			//				ret = DocumentHelper.createElement(new QName("input", ComponentUtils.XHTML_NAMESPACE));
			//				ret.addAttribute("type", "text");
			//				ret.addAttribute("readonly", "readonly");
			//				ret.addAttribute("value", "未关联字段");
			//			}
		} else if ("/UI/base/components/bindTemplate.xbl.xml#bindTemplate".equals(target.attributeValue("component"))) {
			ret = target.createCopy();
			ret.remove(ret.attribute("component"));
		} else if ("/UI/system/components/cellLayout.xbl.xml#cellLayout".equals(target.attributeValue("component"))) {
			ret = parseCellLayout(target);
		} else if (target.getName().equals("view")) {
			ret = parseView(target, transXform);
		} else {
			ret = target.createCopy();
		}
		ret.addAttribute("style", style != null ? style : target.attributeValue("style"));
		ret.addAttribute("class", cssClass);
		return ret;
	}

	@SuppressWarnings("unchecked")
	private Element parseView(Element view, boolean transXform) {
		Element ret = DocumentHelper.createElement(new QName("div", ComponentUtils.XHTML_NAMESPACE));
		Element layout = (Element) view.selectSingleNode("xui:layout");
		String type = ComponentUtils.getAttributeOfDefault(layout, "type", "flow");
		ret.addAttribute("type", type);

		Map<String, String> viewStyle = parseStyleMap(layout.attributeValue("style"));
		viewStyle.putAll(parseStyleMap(view.attributeValue("style")));
		if (view.getParent() != null) {
			Element pLayout = (Element) view.getParent().selectSingleNode("xui:layout");
			if (pLayout == null)//maybe BindTemplate
				pLayout = view.getParent();
			if ("flow".equals(pLayout.attributeValue("type", "flow"))) {
				viewStyle.put("position", "relative");
			} else {
				viewStyle.put("position", "absolute");
			}
		}
		ret.addAttribute("style", getStyle(viewStyle));
		Iterator<Element> i = layout.elementIterator();
		while (i.hasNext()) {
			Element ele = i.next();
			Map<String, String> eleStyle = parseStyleMap(ele.attributeValue("style"));
			if ("flow".equals(type)) {
				eleStyle.put("position", "relative");
			} else
				eleStyle.put("position", "absolute");
			if (ele.attribute("style") != null) {
				ele.attribute("style").setText(getStyle(eleStyle));
			} else {
				ele.addAttribute("style", getStyle(eleStyle));
			}
			if (ele.getName().equals("place")) {
				if (ele.attributeValue("control") != null) {
					Element newEle = parseBindComponent((Element) view.selectSingleNode(".//*[@id='" + ele.attributeValue("control") + "']"),
							ele.attributeValue("style"), transXform);
					ret.add(newEle);
				} else {
					ret = DocumentHelper.createElement(new QName("label", ComponentUtils.XHTML_NAMESPACE));
					ret.addAttribute("id", ele.attributeValue("id"));
					ret.setText(ele.attributeValue("control-label"));
				}
			} else {
				Element newEle = parseBindComponent(ele, ele.attributeValue("style"), transXform);
				ret.add(newEle);
			}
		}
		return ret;
	}

	private static final int DEFAULT_ROW_HEIGHT = 19;
	private static final int DEFAULT_COL_WIDTH = 80;

	private boolean hasCssItem(String cssText, String cssItem) {
		if (cssText != null) {
			String[] items = cssText.split(";");
			for (String item : items) {
				item = item.trim();
				String[] subItems = item.split(":");
				if (subItems.length > 0) {
					if (subItems[0].trim().equalsIgnoreCase(cssItem)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	private boolean hasClass(String cssClasses, String clsItem) {
		if (cssClasses != null) {
			String[] items = cssClasses.split(" ");
			for (String item : items) {
				item = item.trim();
				if (clsItem.equalsIgnoreCase(item))
					return true;
			}
		}
		return false;
	}

	protected JSONObject processRadioConfig(Element ele) {
		JSONObject cfg = new JSONObject();
		cfg.put("label", ele.attributeValue("label"));
		cfg.put("name", ele.attributeValue("name"));
		cfg.put("value", ele.attributeValue("value"));
		cfg.put("checkedValue", ele.attributeValue("checkedValue"));
		cfg.put("uncheckedValue", ele.attributeValue("uncheckedValue"));
		cfg.put("checked", "true".equalsIgnoreCase(ele.attributeValue("checked")));
		cfg.put("disabled", "true".equalsIgnoreCase(ele.attributeValue("disabled")));

		return cfg;
	}

	private Element createInputLabel(Element bound, String type) {
		JSONObject cfg = processRadioConfig(bound);
		Element ret = DocumentHelper.createElement(new QName("span", ComponentUtils.XHTML_NAMESPACE));
		ret.addAttribute("data-config", cfg.toJSONString());

		Element eInput = ret.addElement(new QName("input", XMLConstants.XHTML_NAMESPACE));
		eInput.addAttribute("type", type);
		Attribute attr = bound.attribute("bind-checked");
		if (null != attr) {
			ret.add((Attribute) attr.clone());
		}
		attr = bound.attribute("bind-enable");
		if (null != attr) {
			ret.add((Attribute) attr.clone());
		}
		attr = bound.attribute("bind-disable");
		if (null != attr) {
			ret.add((Attribute) attr.clone());
		}
		String name = bound.attributeValue("name");
		if (null != name && !"".equals(name))
			eInput.addAttribute("name", name);
		String value = bound.attributeValue("value");
		if (null != value && !"".equals(value))
			eInput.addAttribute("value", value);

		String label = bound.attributeValue("label");
		Element eLabel = ret.addElement(new QName("label", XMLConstants.XHTML_NAMESPACE));
		if (null != label && !"".equals(label))
			eLabel.setText(label);
		return ret;
	}

	@SuppressWarnings("unchecked")
	private Element parseCellLayout(Element view) {

		int defaultRowHeight = Integer.parseInt(view.attributeValue("row-height", DEFAULT_ROW_HEIGHT + ""));
		int defaultColumnWidth = Integer.parseInt(view.attributeValue("column-width", DEFAULT_COL_WIDTH + ""));

		Element content = view.element("layout-content");
		String tableText = null;
		if (content != null) {
			tableText = content.getText().trim();
		}
		if (tableText.equals("")) {
			tableText = "<xhtml:table xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"  class=\"no-editor-border\"></xhtml:table>";
		} else
			tableText = tableText.replace("<table", "<xhtml:table xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"  class=\"no-editor-border\" ")
					.replace("</table>", "</xhtml:table>");
		tableText = tableText.replace("<tr", "<xhtml:tr").replace("</tr>", "</xhtml:tr>");
		tableText = tableText.replace("<td", "<xhtml:td").replace("</td>", "</xhtml:td>");
		Element table = null;
		try {
			table = DocumentHelper.parseText(tableText).getRootElement();
		} catch (DocumentException e) {
			throw new UIException("解析CellLayout表格失败:" + e.getMessage(), e);
		}
		Element regions = view.element("dataRegions");
		if (regions == null) {
			throw new UIException("CellLayout[" + view.attributeValue("id") + "]未设置数据区域");
		}
		Set<Integer> dataRegions = new HashSet<Integer>();
		table.addAttribute("data-config", regions.getText());
		JSONObject config = JSON.parseObject(regions.getText());
		Iterator<String> itor = config.keySet().iterator();
		while (itor.hasNext()) {
			String dataId = itor.next();
			this.relDatas.add(dataId);
			String[] rows = config.getString(dataId).split(",");
			for (String r : rows) {
				dataRegions.add(Integer.parseInt(r));
			}
		}

		int totalHeight = 0;
		int totalWidth = 0;
		List<Element> trs = table.elements(new QName("tr", XMLConstants.XHTML_NAMESPACE));
		for (int i = 0; i < trs.size(); i++) {
			Element tr = trs.get(i);
			List<Element> tds = tr.elements(new QName("td", XMLConstants.XHTML_NAMESPACE));
			for (int j = 0; j < tds.size(); j++) {
				Element td = tds.get(j);
				if (i == 0) {
					td.addAttribute("class", "first-row first-cell");
					if (j != 0) {
						String style = td.attributeValue("style");
						int colWidth = defaultColumnWidth;
						if (style == null) {
							td.addAttribute("style", "WIDTH:" + colWidth + "px;");
						} else if (!hasCssItem(style, "width")) {//!style.toUpperCase().contains("\"WIDTH:") && !style.toUpperCase().contains(" WIDTH:")){
							td.remove(td.attribute("style"));
							td.addAttribute("style", style + ";WIDTH:" + colWidth + "px;");
						} else {
							try {
								style = style.toUpperCase();
								String tmp = style.substring(style.indexOf("WIDTH:") + 6);
								tmp = tmp.substring(0, tmp.indexOf("PX")).trim();
								colWidth = Integer.parseInt(tmp);
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
						totalWidth += colWidth;
					}
				}
				if (j == 0) {
					td.addAttribute("class", "first-col");
					if (i != 0) {
						String style = td.attributeValue("style");
						int rowHeight = defaultRowHeight;
						if (style == null) {
							td.addAttribute("style", "HEIGHT:" + rowHeight + "px;");
						} else if (!hasCssItem(style, "height")) {//!style.toUpperCase().contains("\"HEIGHT:") && !style.toUpperCase().contains(" WIDTH:")){
							td.remove(td.attribute("style"));
							td.addAttribute("style", style + ";HEIGHT:" + rowHeight + "px;");
						} else {
							try {
								style = style.toUpperCase();
								String tmp = style.substring(style.indexOf("HEIGHT:") + 7);
								tmp = tmp.substring(0, tmp.indexOf("PX")).trim();
								rowHeight = Integer.parseInt(tmp);
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
						totalHeight += rowHeight;
					}
				}

				String componentId = td.attributeValue("componentId");
				if (componentId != null) {
					Element control = (Element) view.selectSingleNode(".//*[@id='" + componentId + "' or @control='" + componentId + "']");
					if (control != null) {
						if (dataRegions.contains(i)) {
							tr.addAttribute("style", "display:none");
							// 只替换数据区域中的控件
							Element c = parseBindComponent(control, control.attributeValue("style"), true);
							if (c.getName().equals("label") && hasClass(c.attributeValue("class"), "autoMegre")) {
								td.addAttribute("class", "autoMegre");
								c.addAttribute("class", c.attributeValue("class").replace("autoMegre", ""));
							}
							td.add(c);
						} else {
							td.add(control);
						}
						td.remove(td.attribute("componentId"));
					}
				}
			}
		}

		Attribute tableStyleAttr = table.attribute("style");
		String boundStyle = view.attributeValue("style");
		String tableStyle = boundStyle + ";" + tableStyleAttr.getValue() + ";WIDTH:" + totalWidth + "px;HEIGHT:auto";
		table.remove(tableStyleAttr);
		table.addAttribute("style", tableStyle);
		table.addAttribute("class", "celllayout");

		return table;

	}

	private Map<String, String> parseStyleMap(String style) {
		Map<String, String> ret = new HashMap<String, String>();
		if (style != null) {
			String[] args = style.split(";");
			for (String s : args) {
				String[] ss = s.split(":");
				if (ss.length > 1) {
					ret.put(ss[0].toLowerCase(), ss[1]);
				}
			}
		}
		return ret;
	}

	private String getStyle(Map<String, String> style) {
		StringBuffer sb = new StringBuffer();
		for (String p : style.keySet()) {
			String value = style.get(p);
			if (Utils.isNotEmptyString(value))
				sb.append(p).append(":").append(value).append(";");
		}
		return sb.toString();
	}

}