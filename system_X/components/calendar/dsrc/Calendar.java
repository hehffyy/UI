import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class Calendar implements JavaTemplate {
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Element execute(Element bound, Map context) throws XBLException {
		
		String id = ComponentUtils.getAttributeOfReuired(bound, "id"); //组建id
		Element rootE = bound;
		
		List<Node> lab = rootE.selectNodes("./xhtml:div/xhtml:table/xhtml:tr/xhtml:td/xforms:trigger/xforms:label");
		lab.get(0).setText("<<");
		lab.get(1).setText("<");
		lab.get(2).setText(">");
		lab.get(3).setText(">>");
		lab.get(4).setText("今天");
		
		List<Node> nodes = rootE.selectNodes("./xhtml:div/xhtml:table/xhtml:tr/xhtml:td/xforms:trigger");
		
		//上一年
		Element ele = (Element) nodes.get(0);
		ele.add(ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "').prevYearButton();"));
		//上一月
		ele = (Element) nodes.get(1);
		ele.add(ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "').prevMonthButton();"));
		//下一月
		ele = (Element) nodes.get(2);
		ele.add(ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "').nextMonthButton();"));
		//下一年
		ele = (Element) nodes.get(3);
		ele.add(ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "').nextYearButton();"));
		//今天
		ele = (Element) nodes.get(4);
		ele.add(ComponentUtils.createScriptAction("DOMActivate", null, "justep.xbl('" + id + "').todayButton();"));
		
		ele = (Element) rootE.selectSingleNode("./xhtml:div/xhtml:table/xhtml:tr/xhtml:td[@extKind='dateTitle']");
		ele.remove(ele.attribute("extKind"));
		ele.attribute("id").setValue(id + "_dateTitle");
		
		
		ele = (Element) rootE.selectSingleNode("./xhtml:div/xhtml:table/xhtml:tr/xhtml:td[@cnDate='cnDateTitle']");
		ele.remove(ele.attribute("cnDate"));
		ele.attribute("id").setValue(id + "_cnDateInfo");

		/**
		 * 查找高度
		 */
		Integer height = null;
		ele = (Element) rootE.getDocument().selectSingleNode("//xui:place[@control='" + id + "']");
		String style = ele.attributeValue("style");
		
		if(style!=null){
			String[] attributes = style.split(";");
			for (int i = 0; i < attributes.length; i++) {
				if (attributes[i].startsWith("height")) {
					String heights = attributes[i];
					String str = heights.split(":")[1];
					
					
					if (str.indexOf("px") >= 0 ){
						//height = Integer.parseInt(str.substring(0, str.length() - 2)) - 50 - 22;
						//height = (int) (Integer.parseInt(str.substring(0, str.length() - 2)) - Integer.parseInt(str.substring(0, str.length() - 2))*0.22);
						height = Integer.parseInt(str.substring(0, str.length() - 2));
						height = (int)(height - height*0.22);
					}
					break;
				}
			}
		}
		
		ele = (Element) rootE.selectSingleNode("./xhtml:div/xhtml:table[@class='dateTable']");
		ele.remove(ele.attribute("class"));
		nodes = ele.selectNodes("./xhtml:tr");
		for (int i = 0; i < nodes.size(); i++) {
			ele = (Element) nodes.get(i);
			style = ele.attributeValue("style");
			if (height != null) {
				int trH = height / 6 + (i + 1 < height % 6 ? 1 : 0);
				style = (style==null?"":style) + "height:" + trH + "px;";
			}else{
				int trH = i<=3?17:16;
				style = (style==null?"":style) + "height:" + trH + "%;";
			}
			
			if(ele.attribute("style")==null)
				ele.addAttribute("style", style);
			else
				ele.attribute("style").setValue(style);
			
			//id 转换
			List<Node> tdNodes = ele.selectNodes("./xhtml:td");
			for (int j = 0; j < tdNodes.size(); j++)
				((Element) tdNodes.get(j)).attribute("id").setValue(id + "_td" + i + j);
		}
		    
		    
		//解析rootE
		Element root = null;
		try {
			//String 类型的转换成Document对象。rootE.asXML()为字符串。
			Document doc = DocumentHelper.parseText(rootE.asXML());
			//解析doc对象
			root = (Element) doc.selectSingleNode("./xhtml:div");
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		/**************************/
		return root;
	}
}