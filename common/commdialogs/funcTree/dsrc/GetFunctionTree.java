import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import com.justep.common.SystemUtils;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.JustepConfig;
import com.justep.ui.impl.JProcessorImpl;
import com.justep.ui.system.service.permission.MenuUtils;

public class GetFunctionTree extends JProcessorImpl {

	//流程业务选择过滤功能  在流程功能选择时，默认过滤掉在配置文件中定义的功能
	private static String glnrc = null;

	static {
		String appName = "default";
		Map<String, String> vars = new HashMap<String, String>();
		String str1 = (Utils.isEmptyString(appName) ? "/UI/appConfig/default" : "/UI/appConfig/" + appName) + "/main.config.xml";
		File file = new File(FileSystemWrapper.instance().getRealPath(str1));
		if (!file.exists()) {
			file = new File(FileSystemWrapper.instance().getRealPath("/UI/appConfig/main.config.xml"));
		}
		try {
			SAXReader localSAXReader = new SAXReader();
			Document doc = localSAXReader.read(file);
			List items = doc.selectNodes("/root/item");
			Iterator itor = items.iterator();
			while (itor.hasNext()) {
				Element ele = (Element) itor.next();
				vars.put(ele.attributeValue("name"), ele.getText());
			}
		} catch (Exception localException) {
			throw new RuntimeException(localException);
		}

		glnrc = vars.get("flow_choice");
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);
		String type = request.getParameter("type");

		// 菜单文件根目录
		// roots : UI mobileUI UI2
		String rootsParam = request.getParameter("roots");
		// 菜单文件后缀 
		// file : .function.xml .function.m.xml
		String devicesParam = request.getParameter("devices");

		Collection<String> roots = (rootsParam != null) ? Arrays.asList(rootsParam.split(",")) : JustepConfig.getUIRoots();

		if (SystemUtils.isEmptyString(devicesParam)) {
			devicesParam = MenuUtils.DEVICE_PC + "," + MenuUtils.DEVICE_MOBILE;
		}

		Document domRows = DocumentHelper.createDocument(org.dom4j.DocumentHelper.createElement("rows"));
		for (String root : roots) {
			Document domMenus = MenuUtils.getMenus(request, "/" + root, devicesParam);
			Element elmTreeRoot = (Element) domMenus.selectSingleNode("/root");
			Element elmRows = domRows.getRootElement();
			boolean isTree = "tree".equals(type);
			transRowData(elmTreeRoot, elmRows, "", isTree);
		}

		response.setContentType("text/xml");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(domRows.asXML());
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doGet(request, response);
		doPost(request, response);
	}

	private boolean isExist(Element node, String name) {
		if (node.getParent() == null)
			return false;
		if (name.contains(node.attributeValue("label"))) {
			return true;
		}
		return isExist(node.getParent(), name);
	}

	public void transRowData(Element parentElement, Element resultElement, String parentFName, boolean isTree) {
		@SuppressWarnings("unchecked")
		List<Element> childrenElements = parentElement.elements();
		for (Element childElement : childrenElements) {
			//TODO 这块是针对于流程而言,要加限制
			if (glnrc != null && !isExist(childElement, glnrc)) {
				continue;
			}

			String id = childElement.attributeValue("access_id") == null ? UUID.randomUUID().toString() : childElement.attributeValue("access_id");
			String label = childElement.attributeValue("label") == null ? "" : childElement.attributeValue("label");
			String url = childElement.attributeValue("url") == null ? "" : childElement.attributeValue("url");
			String process = childElement.attributeValue("process") == null ? "" : childElement.attributeValue("process");
			String activity = childElement.attributeValue("activity") == null ? "" : childElement.attributeValue("activity");
			String activityFName = parentFName + "/" + label;
			boolean isFolder = (process == "");

			HashMap sonParam = sonElement(childElement, parentFName, label);

			if (isTree || !isFolder) {

				if (sonParam == null) {

					Element rowElement = resultElement.addElement("row");
					rowElement.addAttribute("id", id);
					rowElement.addElement("cell");
					rowElement.addElement("cell").addText(label);
					rowElement.addElement("cell").addText(url);
					rowElement.addElement("cell").addText(process);
					rowElement.addElement("cell").addText(activity);
					rowElement.addElement("cell").addText(isFolder ? "1" : "0");
					rowElement.addElement("cell").addText(activityFName);
					if (isTree)
						transRowData(childElement, rowElement, activityFName, isTree);
					else
						transRowData(childElement, resultElement, activityFName, isTree);

				} else {
					Element rowElement = resultElement.addElement("row");
					rowElement.addAttribute("id", sonParam.get("id").toString());
					rowElement.addElement("cell");
					rowElement.addElement("cell").addText(label);
					rowElement.addElement("cell").addText(sonParam.get("url").toString());
					rowElement.addElement("cell").addText(sonParam.get("process").toString());
					rowElement.addElement("cell").addText(sonParam.get("activity").toString());
					rowElement.addElement("cell").addText("0");
					rowElement.addElement("cell").addText(sonParam.get("activityFName").toString());

				}
			} else
				transRowData(childElement, resultElement, activityFName, isTree);
		}
	}

	private HashMap sonElement(Element currentElement, String parentFName, String parentLabel) {
		if (currentElement == null)
			return null;

		List<Element> childrenElements = currentElement.elements();
		HashMap<String, String> params = new HashMap<String, String>();
		for (Element childElement : childrenElements) {
			String id = childElement.attributeValue("access_id") == null ? UUID.randomUUID().toString() : childElement.attributeValue("access_id");
			String label = childElement.attributeValue("label") == null ? "" : childElement.attributeValue("label");
			String url = childElement.attributeValue("url") == null ? "" : childElement.attributeValue("url");
			String process = childElement.attributeValue("process") == null ? "" : childElement.attributeValue("process");
			String activity = childElement.attributeValue("activity") == null ? "" : childElement.attributeValue("activity");
			if (process != "") {
				params.put("id", id);
				params.put("label", label);
				params.put("url", url);
				params.put("process", process);
				params.put("activity", activity);
				String activityFName = parentFName + "/" + parentLabel;
				params.put("activityFName", activityFName);

				return params;
			}

		}
		return null;
	}

}
