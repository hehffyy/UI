import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class Sign implements JavaTemplate {

	public Element execute(Element bound, Map context) throws XBLException {
		//组建id
		String id = ComponentUtils.getAttributeOfReuired(bound, "id");
		//关联字段
		String ref = ComponentUtils.getAttributeOfReuired(bound, "ref");
		//是否禁用
		String isDisabled = ComponentUtils.getAttributeOfDefault(bound, "disabled", "false");

		//寻找menu菜单，添加点击事件
		Element element = (Element) bound.selectSingleNode("./xhtml:div[@component='/UI/system/components/menu.xbl.xml#menu']");
		//更换Menu Id
		String menuId = id + "_signMenu";
		element.addAttribute("menu-id", menuId);
//		element.addElement("xui:menuitem").addAttribute("label", "重置位置").addAttribute("id","resetPos");
		
		//添加菜单事件
		Element action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._menuClick(event);");
		element.add(action);
		//添加签名事件
		Element trigger = (Element) bound.selectSingleNode("./xhtml:table/xhtml:tr/xhtml:td/xforms:trigger");
		action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._signClick(event);");
		trigger.add(action);
		trigger.addAttribute("id", id + "_trigger");
		trigger.addAttribute("ref", ref);

		//判断是否禁用
		if ("true".equals(isDisabled)) {
			((Element) trigger).addAttribute("disabled", "true");
		}

		//设置input大小、只读
		element = (Element) bound.selectSingleNode(".//xforms:input");
		element.addAttribute("ref", ref);
		element.addAttribute("id", id + "_input");
		element.addAttribute("readonly", "true");

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