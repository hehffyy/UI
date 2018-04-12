import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.ui.system.component.data.DataUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class MapBrowser implements JavaTemplate {
	@Override
	public Element execute(Element bound, Map context) throws XBLException {
		String sendFunc = createSendFunc(bound);
		bound.addAttribute("onSend", sendFunc);
		String receiveFunc = createReceiveFunc(bound);
		bound.addAttribute("onReceive", receiveFunc);

		Element root = null;
		try {
			Document doc = DocumentHelper.parseText(bound.asXML());
			root = (Element) doc.getRootElement();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return root;
	}

	private String createSendFunc(Element bodyE) {
		String funcName = getScriptFunName();
		StringBuffer script = new StringBuffer();
		String onCreateInitActions = bodyE.attributeValue("onCreateInitActions");
		script.append("function ").append(funcName).append("(event){\n");
		//script.append("\tdebugger;\n");
		script.append("\tvar param = event.data || {};\n");
		script.append("\tparam.subSystemName = '" + bodyE.attributeValue("subSystemName") + "';\n");
		if (onCreateInitActions != null) {
			script.append("\tvar f = null;\n");
			script.append("\ttry {\n");
			script.append("\t\tf = eval(\"" + onCreateInitActions + "\");\n");
			script.append("\t} catch (e) {}\n");
			script.append("\tif (typeof(f) == \"function\") {\n");
			script.append("\t\tvar e = {source : event.source};\n");
			script.append("\t\tparam.actions = f.call(event.source,e);\n");
			script.append("\t}\n");
		}
		script.append("\treturn param;\n");
		script.append("}");

		Element funcE = DataUtils.createXHTMLScript(script.toString());
		bodyE.add(funcE);
		return funcName;
	}

	private String createReceiveFunc(Element bodyE) {
		String funcName = getScriptFunName();
		StringBuffer script = new StringBuffer();
		String onMapInited = bodyE.attributeValue("onMapInited");
		script.append("function ").append(funcName).append("(event){\n");
		//script.append("\tdebugger;\n");
		script.append("\tjustep.xbl('" + bodyE.attributeValue("id") + "').mapBrowser = event.data;\n");
		if (onMapInited != null) {
			script.append("\tvar f = null;\n");
			script.append("\ttry {\n");
			script.append("\t\tf = eval(\"" + onMapInited + "\");\n");
			script.append("\t} catch (e) {}\n");
			script.append("\tif (typeof(f) == \"function\") {\n");
			script.append("\t\tvar e = {source : event.source,data:event.data};\n");
			script.append("\t\tf.call(event.source,e);\n");
			script.append("\t}\n");
		}
		script.append("}");

		Element funcE = DataUtils.createXHTMLScript(script.toString());
		bodyE.add(funcE);
		return funcName;
	}

	private String getScriptFunName() {
		String funcName = "func_" + String.valueOf(java.lang.Math.abs(java.util.UUID.randomUUID().toString().hashCode()));
		return funcName;
	}
}