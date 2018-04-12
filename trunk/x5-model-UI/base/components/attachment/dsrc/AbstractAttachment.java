import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.butone.knockout.DataBindUtils;
import com.justep.system.transform.Utils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public abstract class AbstractAttachment implements JavaTemplate {
	protected String koComponent;

	public Element execute(Element bound, @SuppressWarnings("rawtypes") Map context) throws XBLException {

		String ref = bound.attributeValue("ref");
		String table = ref.substring(ref.indexOf("'") + 1, ref.lastIndexOf("'")), relation = ref.substring(ref.lastIndexOf("/") + 1);
		if (inListTemplate(bound, table)) {
			bound.addAttribute("bind-ref", "$object.ref('" + relation + "')");
		} else {
			bound.addAttribute("bind-ref", table + ".ref('" + relation + "')");
		}

		DataBindUtils.parseDataConfig(bound, koComponent, true);
		bound.remove(bound.attribute("component"));
		return bound.createCopy();
	}

	private boolean inListTemplate(Element bound, String table) {
		Element p = bound.getParent();
		while (p != null && (p instanceof Element)) {
			if ("div".equals(p.getName()) && p.attribute("data-bind") != null
					&& p.attributeValue("data-bind").contains("$model/UI/base/components/knockout/bindTemplate")) {
				String dataConfig = p.attributeValue("data-config");
				if (Utils.isNotEmptyString(dataConfig)) {
					JSONObject config = JSON.parseObject(dataConfig);
					if (config.containsKey("data") && table.equals(config.getString("data"))) {
						return config.containsKey("list") && config.getBooleanValue("list");
					}
				}
			} else if ("table".equals(p.getName())) {
				String dataConfig = p.attributeValue("data-config");
				if (Utils.isNotEmptyString(dataConfig)) {
					JSONObject config = JSON.parseObject(dataConfig);
					if (config.containsKey(table)) {
						return inTableDataRegion(bound, p, config.getString(table));
					}
				}
			}
			//			else if (p.attributeValue("data-bind") != null) {
			//				if (p.attributeValue("data-bind").contains("foreach"))
			//					return true;
			//			} 
			p = p.getParent();
		}
		return false;
	}

	private boolean inTableDataRegion(Element bound, Element table, String dataRegion) {
		Element tr = bound.getParent();
		while (tr.getParent() != table) {
			tr = tr.getParent();
		}
		List list = table.selectNodes("./*[local-name()='tr']");
		String[] trs = dataRegion.split(",");
		for (String rowNo : trs) {
			if (list.indexOf(tr) == Integer.parseInt(rowNo))
				return true;
		}
		return false;
	}
}