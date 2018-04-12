import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;

import com.butone.studio.ui.editors.property.datasource.UnitTypeListDatasource;
import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class UnitControl implements JavaTemplate {

	public Element execute(Element bound, Map context) throws XBLException {
		try {
			//组件id
			String id = ComponentUtils.getAttributeOfReuired(bound, "id");
			//ref
			String ref = ComponentUtils.getAttributeOfReuired(bound, "ref");

			String s = bound.attributeValue("class");
			if (s != null) {
				s.replaceAll("xui-select", "");
				if (s.length() > 0)
					bound.addAttribute("class", s);
			}

			Document doc = DocumentHelper.parseText(bound.asXML());
			Element root = (Element) doc.selectSingleNode("./xhtml:div");
			Element select = createGridSelect(id + "_ref", ref, bound);
			root.add(select);
			return root;
		} catch (Exception e) {
			throw new XBLException("生成单位控制字段异常：\n" + e.getMessage(), e);
		}
	}

	private Element createGridSelect(String id, String ref, Element bound) {
		Element select = ComponentUtils.createComponentDiv(ComponentUtils.GRID_SELECT_COMPONENT, id);
		select.addAttribute("ref", ref);
		select.addAttribute("style", "width:100%;height:100%");
		String s = ComponentUtils.getAttributeOfDefault(bound, "tabindex", "");
		if (!"".equals(s)) {
			select.addAttribute("tabindex", s);
		}
		s = ComponentUtils.getAttributeOfDefault(bound, "accesskey", "");
		if (!"".equals(s)) {
			select.addAttribute("accesskey", s);
		}
		s = ComponentUtils.getAttributeOfDefault(bound, "readonly", "");
		if (!"".equals(s)) {
			select.addAttribute("readonly", s);
		}
		s = ComponentUtils.getAttributeOfDefault(bound, "disabled", "");
		if (!"".equals(s)) {
			select.addAttribute("disabled", s);
		}
		select.addElement(new QName("value", ComponentUtils.XFORMS_NAMESPACE)).addAttribute("ref", "label");
		select.addElement(new QName("label", ComponentUtils.XFORMS_NAMESPACE)).addAttribute("ref", "label");

		Element itemset = select.addElement(new QName("itemset", ComponentUtils.XFORMS_NAMESPACE));
		itemset.addElement(new QName("column", ComponentUtils.XFORMS_NAMESPACE)).addAttribute("ref", "label");

		Element itemsetData = itemset.addElement(new QName("itemset-data")).addAttribute("xmlns", "");
		Element rows = itemsetData.addElement("rows");
		/**下拉控件添加下拉选项 */
		String unitType = ComponentUtils.getAttributeOfReuired(bound, "unitType");
		String[] unitName = UnitTypeListDatasource.getUnitTypeInfo(unitType).get("unitNames").split(",");
		for (int i = 0; i < unitName.length; i++) {
			Element row = rows.addElement("row");//.addAttribute("id", String.format("%d", i));
			row.addElement("cell").addText(unitName[i]);
		}
		return select;
	}

}
