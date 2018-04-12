import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.system.transform.Utils;
import com.justep.ui.system.component.data.DataUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class UIPlugin implements JavaTemplate {
	@Override
	public Element execute(Element bound, Map context) throws XBLException {
		Element node = (Element) bound.selectSingleNode("xui:content");
		if (node != null) {
			String content = node.getText();
			if (Utils.isNotEmptyString(content)) {
				String pluginId = getPluginContentId();
				createPluginContext(bound, content, pluginId);
				bound.addAttribute("pluginId", pluginId);
			}
			bound.remove(node);
		}

		Element root = null;
		try {
			Document doc = DocumentHelper.parseText(bound.asXML());
			root = (Element) doc.getRootElement();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return root;
	}

	private void createPluginContext(Element bodyE, String content, String pluginContentId) {
		String script = "window['" + pluginContentId + "'] = " + content;
		Element initScript = DataUtils.createXHTMLScript(script);
		Element headE = DocumentHelper.createElement(DataUtils.INHEAD_QNAME);
		headE.add(initScript);
		bodyE.add(headE);
	}

	private String getPluginContentId() {
		String funcName = "__uiPlugin_" + String.valueOf(java.lang.Math.abs(java.util.UUID.randomUUID().toString().hashCode()));
		return funcName;
	}

}