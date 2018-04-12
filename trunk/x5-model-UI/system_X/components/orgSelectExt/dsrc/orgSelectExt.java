import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

/**

 */
public class orgSelectExt implements JavaTemplate {
	public Element execute(Element bound, Map context) throws XBLException {
		String id = ComponentUtils.getAttributeOfReuired(bound, "id"); //组件ID
		String ref = ComponentUtils.getAttributeOfReuired(bound, "ref"); //机构名称
		//String extRef = ComponentUtils.getAttributeOfReuired(bound, "extRef");//机构ID
		String isDisabled = ComponentUtils.getAttributeOfDefault(bound, "disabled", "false"); //是否禁用
		String dialogTitle = ComponentUtils.getAttributeOfDefault(bound, "dialogTitle", "组织机构选择");

		Attribute dialogTitleAttr = bound.attribute("dialogTitle");
		if (dialogTitleAttr != null)
			bound.remove(dialogTitleAttr);
		
		
		
		Element inputDiv = (Element) bound.selectSingleNode("./xhtml:table/xhtml:tr/xhtml:td/xhtml:div/xhtml:div");
		//兼容老的资源
		if(inputDiv!=null){
			
			inputDiv.addAttribute("id",id+"_qc");
			inputDiv.addAttribute("onclick","justep.xbl('" + id + "')._clear()");
			
		    Element inputTable =  (Element) bound.selectSingleNode("./xhtml:table");
			inputTable.addAttribute("onmouseover",  "$('#"+id+"_qc').show();");
			inputTable.addAttribute("onmouseout",  "$('#"+id+"_qc').hide();"); 
		}
	
		

		Element rootE = bound;
		// 人员选择
		{
			Element dialog = (Element) bound.selectSingleNode("./xhtml:div[@component='/UI/system/components/windowDialog.xbl.xml#windowDialog']");
			Attribute idAttr = dialog.attribute("id");
			if (idAttr == null) {
				dialog.addAttribute("id", id + "_" + "dialog");
				idAttr = dialog.attribute("id");
			}
			Attribute dialogIdAttr = rootE.attribute("dialogId");
			if (dialogIdAttr == null) {
				rootE.addAttribute("dialogId", idAttr.getValue());
			} else {
				dialogIdAttr.setValue(idAttr.getValue());
			}

			Attribute titleAttr = dialog.attribute("title");
			if (titleAttr == null)
				dialog.addAttribute("title", dialogTitle);
			else
				titleAttr.setValue(dialogTitle);

			Attribute onReceiveAttr = dialog.attribute("onReceive");
			if (onReceiveAttr != null)
				dialog.remove(onReceiveAttr);

		}

		// 按钮
		{
			Element trigger = (Element) rootE.selectSingleNode("./xhtml:table/xhtml:tr/xhtml:td/xforms:trigger");
			//trigger.addAttribute("id", "trigger-" + id);
			Element action = (Element) trigger.selectSingleNode("./xforms:action[@ev:event='DOMActivate']");
			if (action != null) {
				trigger.remove(action);
			}
			action = ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "')._selectOrgUnit(event)");
			trigger.add(action);
			
			trigger.addAttribute("ref", ref);
			Attribute disabledAttr = trigger.attribute("disabled");
			//判断是否禁用
			if ("true".equals(isDisabled)) {
				if (disabledAttr == null) {
					trigger.addAttribute("disabled", "true");
				}
			} else {
				if (disabledAttr != null)
					trigger.remove(disabledAttr);
			}
		}

		// 设置input
		{
			Element input = (Element) rootE.selectSingleNode(".//xforms:input");
			Attribute refAttr = input.attribute("ref");
			if (refAttr == null) {
				input.addAttribute("ref", ref);
			} else {
				refAttr.setValue(ref);
			}
			Attribute disabledAttr = input.attribute("disabled");
			//判断是否禁用
			if ("true".equals(isDisabled)) {
				if (disabledAttr == null) {
					input.addAttribute("disabled", "true");
				}
			} else {
				if (disabledAttr != null)
					input.remove(disabledAttr);
			}
		}
		//			return rootE;
		/**************************/
		Element root = null;
		try {
			Document document = DocumentHelper.parseText(rootE.asXML());
			root = (Element) document.selectSingleNode("./xhtml:div");
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		/**************************/
		return root;
	}
}