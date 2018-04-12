import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class SequenceCode implements JavaTemplate {
	@Override
	public Element execute(Element bound, Map context) throws XBLException {
		//组件id
		String id = ComponentUtils.getAttributeOfReuired(bound, "id");
		//关联字段
		String ref = ComponentUtils.getAttributeOfReuired(bound, "ref");
		//是否禁用
		String isDisabled = ComponentUtils.getAttributeOfDefault(bound, "disabled", "false");
		String showButton = ComponentUtils.getAttributeOfDefault(bound, "showButton", "true");

		//寻找menu菜单，添加点击事件
		Element element = (Element) bound.selectSingleNode("./xhtml:div[@component='/UI/system/components/menu.xbl.xml#menu']");
		if ("false".equals(showButton)) {
			element.getParent().remove(element);
		} else {
			//更换Menu Id
			String menuId = id + "_menu";
			element.addAttribute("menu-id", menuId);
			//添加菜单事件
			Element action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._menuClick(event);");
			element.add(action);
		}

		//添加生成按钮时间
		Element trigger = (Element) bound.selectSingleNode("./xhtml:table/xhtml:tr/xhtml:td/xforms:trigger");
		if ("false".equals(showButton)) {
			Element td = trigger.getParent();
			td.remove(trigger);
			td.attributeValue("style", "width:0px");
		} else {
			Element action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._genClick(event);");
			trigger.add(action);
			trigger.addAttribute("id", id + "_trigger");
			trigger.addAttribute("ref", ref);
		}

		//判断是否禁用
		if ("true".equals(isDisabled)) {
			((Element) trigger).addAttribute("disabled", "true");
		}

		//设置input大小、只读
		Element input = (Element) bound.selectSingleNode(".//xforms:input");
		input.addAttribute("ref", ref);
		input.addAttribute("id", id + "_input");
		input.addAttribute("readonly", "true");

		/**************************/
		Element root = null;
		try {
			Document doc = DocumentHelper.parseText(bound.asXML());
			root = (Element) doc.getRootElement();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		/**************************/
		return root;
	}
}