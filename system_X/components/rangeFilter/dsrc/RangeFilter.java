import java.util.Map;

import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.QName;


import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class RangeFilter implements JavaTemplate {

	private String id;

	private String filterData;
	private String filterRelations;
	private String operator;
	
	private String autoRefresh;
	private String onGetCondition;

	private String modelID;
	private String innerDataID;
	private String inputID;

	@SuppressWarnings("unchecked")
	public Element execute(Element bound, Map context) throws XBLException {
		this.init(bound);

		String boundClass = bound.attributeValue("class");
		bound.addAttribute("class", "xui-input" + (ComponentUtils.isStringEmpty(boundClass)? "" : (" " + boundClass)));

		Element root = DocumentHelper.createElement(new QName("root"));
		root.add(this.createXBLAttribute());
		root.add(this.createData());
		root.add(this.createInput(bound));
		return root;
	}

	private void init(Element bound) throws XBLException {
		this.id = ComponentUtils.getAttributeOfReuired(bound, "id");
		this.filterData = ComponentUtils.getAttributeOfReuired(bound, "filter-data");
		this.filterRelations = ComponentUtils.getAttributeOfReuired(bound, "filter-relations");
		this.operator = ComponentUtils.getAttributeOfReuired(bound, "operator");
		this.autoRefresh = ComponentUtils.getAttributeOfDefault(bound, "auto-refresh", "false");
		this.onGetCondition = bound.attributeValue("onGetCondition");

		String globalID = com.justep.xbl.Utils.generateGlobalId();
		this.modelID = this.id + "_model_" + globalID;
		this.innerDataID = this.id + "_data_" + globalID;
		this.inputID = this.id + "_input_" + globalID;
	}

	private Element createXBLAttribute() {
		Element e = ComponentUtils.createXBLAttribute();
		e.addAttribute("filter-data", this.filterData);
		e.addAttribute("filter-relations", this.filterRelations);
		e.addAttribute("operator", this.operator);
		e.addAttribute("auto-refresh", this.autoRefresh);

		e.addAttribute("model-id", this.modelID);
		e.addAttribute("inner-data-id", this.innerDataID);
		e.addAttribute("input-id", this.inputID);

		e.addAttribute("onGetCondition", this.onGetCondition);

		return e;
	}

	private Element createData() {
		Element m = ComponentUtils.createModel(this.modelID);
		Element d = ComponentUtils.createSimpleData(this.innerDataID, "value", true);
		m.add(d);
		return m;
	}

	private Element createInput(Element bound) {
		Element input = DocumentHelper.createElement(new QName("input", ComponentUtils.XFORMS_NAMESPACE))
			.addAttribute("id", this.inputID)
			.addAttribute("ref", String.format("instance('%s')/value", this.innerDataID))
			.addAttribute("class", "xui-autofill");
		String readonly = bound.attributeValue("readonly");
		String disabled = bound.attributeValue("disabled");
		
		if(!ComponentUtils.isStringEmpty(readonly)) input.addAttribute("readonly", readonly);
		if(!ComponentUtils.isStringEmpty(disabled)) input.addAttribute("disabled", disabled);
		return input;
	}

}
