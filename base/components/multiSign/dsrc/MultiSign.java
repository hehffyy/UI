import java.util.Map;
import java.util.Random;

import org.dom4j.Attribute;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.justep.ui.exception.UIException;
import com.justep.ui.system.component.ComponentUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class MultiSign implements JavaTemplate {
	private static final int DEFAULT_HEADER_HEIGHT = 19;
	private static final int DEFAULT_SINGINFO_HEIGHT = 55;
	private static Random random = new Random(System.currentTimeMillis());
	private Element root;
	private Element bound;
	private String id;
	private String dataId;

	public Element execute(Element bound, @SuppressWarnings("rawtypes") Map context) throws XBLException {
		this.bound = bound;
		this.id = ComponentUtils.getAttributeOfReuired(bound, "id");
		this.dataId = ComponentUtils.getAttributeOfReuired(bound, "data");
		this.root = DocumentHelper.createElement("root");

		String template = bound.attributeValue("template");
		if ("grid".equals(template)) {
			try {
				System.out.println(bound.asXML());
				//				System.out.println(bound.selectSingleNode("/*[local-name()='grid']").asXML());
				Element place = (Element) bound.selectSingleNode("*[local-name()='place']");
				if (place == null) {
					throw new UIException("会签字段[" + id + "]未放置Grid组件");
				}
				Element grid = (Element) bound.selectSingleNode("//*[@id='" + place.attributeValue("control") + "']");
				for (Object node : grid.selectNodes("*[local-name()='column']")) {
					((Element) node).addAttribute("readonly", "true");
				}
				bound.addAttribute("innerGridId", place.attributeValue("control"));
				System.out.println(grid.asXML());
				return DocumentHelper.parseText(bound.asXML()).getRootElement();
			} catch (DocumentException e) {
				e.printStackTrace();
			}
		} else if ("celllayout".equals(template)) {
			this.root.addAttribute("innerGridId", id + "_grid");
			createCellLayout();
		} else {
			this.root.addAttribute("innerGridId", id + "_grid");
			createDefault();
		}
		return root;
	}

	private void createCellLayout() {
		Element cellLayout = (Element) bound.selectSingleNode("xhtml:div[@component='/UI/system/components/cellLayout.xbl.xml#cellLayout']");
		if (cellLayout == null) {
			throw new XBLException("会签字段" + this.id + "不包含celllayout模板节点");
		}
		cellLayout = (Element) cellLayout.clone();
		root.add(cellLayout);
		Attribute attr = cellLayout.attribute("style");
		Element dataNode = (Element) bound.getDocument().selectSingleNode(String.format("//*[@id='%s']", dataId));
		attr = dataNode.attribute("store-type");
		if (attr == null)
			dataNode.addAttribute("store-type", "grid");
		else
			attr.setText("grid");
		appendGridBind(root, id + "_grid", dataId);
	}

	private void createDefault() {
		Integer defaultHeaderHeight = Integer.parseInt(bound.attributeValue("header-height", DEFAULT_HEADER_HEIGHT + ""));
		Integer defaultSignInfoHeight = Integer.parseInt(bound.attributeValue("signInfo-height", DEFAULT_SINGINFO_HEIGHT + ""));
		String tableText = "<xhtml:table cellpadding=\"0\" cellspacing=\"0\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\"  class=\"no-editor-border\" style=\"width:100%;table-layout:fixed;\"></xhtml:table>";
		Element table = null;
		try {
			table = DocumentHelper.parseText(tableText).getRootElement();
			root.add(table);
			Attribute attr = bound.attribute("header-height");
			if (attr == null)
				bound.addAttribute("header-height", defaultHeaderHeight.toString());
			else
				attr.setText(defaultHeaderHeight.toString());
			attr = bound.attribute("signInfo-height");
			if (attr == null)
				bound.addAttribute("signInfo-height", defaultSignInfoHeight.toString());
			else
				attr.setText(defaultSignInfoHeight.toString());
			String id = bound.attributeValue("id", "MultiSign_ID_" + Math.abs(MultiSign.random.nextInt()));
			if (bound.attributeValue("id") == null) {
				bound.addAttribute("id", id);
			}
			Element dataNode = (Element) bound.getDocument().selectSingleNode(String.format("//*[@id='%s']", dataId));
			attr = dataNode.attribute("store-type");
			if (attr == null)
				dataNode.addAttribute("store-type", "grid");
			else
				attr.setText("grid");
			appendGridBind(root, id + "_grid", dataId);
			//createBind(root, id + "_ref", "data('" + dataId + "')/fSignInfo");
		} catch (DocumentException e) {
			throw new XBLException("解析模板失败");
		}
	}

	private void appendGridBind(Element root, String id, String dataId) {
		Element grid = ComponentUtils.createComponentDiv("/UI/system/components/grid.xbl.xml#grid", id);
		grid.addAttribute("header-row-height", "0");
		grid.addAttribute("row-height", "0");
		grid.addAttribute("smart-render", "20");
		grid.addAttribute("space-column", "false");
		grid.addAttribute("data", dataId);
		grid.addAttribute("style", "display:none;");
		root.add(grid);
	}
	//	private void createBind(Element parent, String id, String ref) {
	//		if (ref == null || ref.equals(""))
	//			return;
	//		Element div = parent.addElement(new QName("div", XMLConstants.XHTML_NAMESPACE));
	//		div.addAttribute("style", "display:none");
	//		Element output = div.addElement(new QName("output", XMLConstants.XFORMS_NAMESPACE));
	//		output.addAttribute("id", id);
	//		output.addAttribute("ref", ref);
	//	}
}