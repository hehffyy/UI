import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class FileImport implements JavaTemplate {

	public Element execute(Element bound, Map context) throws XBLException {
		Element root = null;
		try {
			Document doc = DocumentHelper.parseText(bound.asXML());
			root = (Element) doc.getRootElement();
			List<Element> elements = root.selectNodes("//*[local-name()='result']");
			JSONArray results = new JSONArray();
			for (Element ele : elements) {
				if (ele.getName().equals("result")) {
					JSONObject result = new JSONObject();
					results.add(result);

					result.put("concept", ele.attributeValue("concept"));
					result.put("origin", ele.attributeValue("origin"));
					result.put("operation", ele.attributeValue("operation"));
					JSONArray mappings = new JSONArray();
					result.put("mappings", mappings);
					List<Element> subEles = ele.elements();
					for (Element subEle : subEles) {
						JSONObject mapping = new JSONObject();
						mappings.add(mapping);
						mapping.put("from", subEle.attributeValue("from"));
						mapping.put("to", subEle.attributeValue("to"));
						if ("true".equals(subEle.attributeValue("key"))) {
							mapping.put("key", true);
						}
						if ("true".equals(subEle.attributeValue("locator")))
							mapping.put("locator", true);
					}
				}
			}

			Iterator i = root.elements().iterator();
			while (i.hasNext()) {
				i.next();
				i.remove();
			}

			Element config = root.addElement("xhtml:div");
			config.addAttribute("role", "result");
			config.addAttribute("style", "display:none");
			config.addCDATA(results.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return root;
	}
}