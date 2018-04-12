import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.ui.system.component.data.DataUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class QueryFill implements JavaTemplate {
	@Override
	public Element execute(Element bound, Map context) throws XBLException {
		String sendFunc = createSendFunc(bound);
		bound.addAttribute("onSend", sendFunc);

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
		String onCreateOpenParams = bodyE.attributeValue("onCreateOpenParams");
		script.append("function ").append(funcName).append("(event){\n");
		script.append("\tvar param = event.data || {};\n");
		if (onCreateOpenParams != null) {
			script.append("\tvar f = null;\n");
			script.append("\ttry {\n");
			script.append("\t\tf = eval(\"" + onCreateOpenParams + "\");\n");
			script.append("\t} catch (e) {}\n");
			script.append("\tif (f && typeof f == \"function\") {\n");
			script.append("\t\tvar e = {source : event.source};\n");
			script.append("\t\tparam.openParams = f.call(event.source,e);\n");
			script.append("\t}\n");
		}
		script.append("\treturn param;\n");
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