import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;

import com.butone.studio.ui.editors.property.datasource.UnitTypeListDatasource;
import com.justep.ui.system.component.ComponentUtils;
import com.justep.ui.xml.XMLConstants;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class UnitField implements JavaTemplate {

	public Element execute(Element bound, Map context) throws XBLException {
		//组建ID
		String id = ComponentUtils.getAttributeOfReuired(bound, "id");
		//关联字段
		String ref = ComponentUtils.getAttributeOfReuired(bound, "ref");
		//单位类型
		String unitType = ComponentUtils.getAttributeOfReuired(bound, "unitType");

		//是否禁用
		String isDisabled = ComponentUtils.getAttributeOfReuired(bound, "disabled");

		//某一类别单位集合
		Map<String, String> info = UnitTypeListDatasource.getUnitTypeInfo(unitType);
		//单位名称集合[]	
		String unitNames = info.get("unitNames");
		//转换比例
		String unitRate = info.get("unitRates");

		//添加事件
		Element trigger = (Element) bound.selectSingleNode("./xhtml:table/xhtml:tr/xhtml:td/xforms:trigger");
		trigger.addAttribute("id", id + "_trigger");
		Element action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._openUnit()");
		trigger.add(action);

		//判断是否禁用
		if ("true".equals(isDisabled)) {
			((Element) trigger).addAttribute("disabled", "true");
		}

		Element text = (Element) bound.selectSingleNode(".//xhtml:input[@type='text']");
		Attribute attr = text.attribute("id");
		if (attr == null) {
			text.addAttribute("id", id + "_text");
		} else {
			attr.setValue(id + "_text");
		}
		bound.add(createXBLAttribute(unitRate, unitNames));
		Element root = null;
		try {
			Document document = DocumentHelper.parseText(bound.asXML());
			root = (Element) document.selectSingleNode("./xhtml:div");

			Element div = root.addElement(new QName("div", XMLConstants.XHTML_NAMESPACE));
			div.addAttribute("style", "display:none");
			Element output = div.addElement(new QName("output", XMLConstants.XFORMS_NAMESPACE));
			output.addAttribute("id", id + "_ref");
			output.addAttribute("ref", ref);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		/**************************/
		return root;
	}

	//创建xbl属性 
	private Element createXBLAttribute(String unitRate, String unitNames) {
		//创建组件内部id
		Element element = ComponentUtils.createXBLAttribute();
		element.addAttribute("unitRate", unitRate); //单位比例
		element.addAttribute("unitNames", unitNames); //单位名称集合
		return element;
	}

}