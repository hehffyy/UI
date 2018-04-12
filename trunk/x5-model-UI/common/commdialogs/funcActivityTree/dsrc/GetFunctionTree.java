import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.common.SystemUtils;
import com.justep.ui.JustepConfig;
import com.justep.ui.impl.JProcessorImpl;
import com.justep.ui.system.service.permission.MenuUtils;

public class GetFunctionTree extends JProcessorImpl {

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

	public void transRowData(Element parentElement, Element resultElement, String parentFName, boolean isTree) {
		@SuppressWarnings("unchecked")
		List<Element> childrenElements = parentElement.elements();
		for (Element childElement : childrenElements) {
			String id = childElement.attributeValue("access_id") == null ? UUID.randomUUID().toString() : childElement.attributeValue("access_id");
			String label = childElement.attributeValue("label") == null ? "" : childElement.attributeValue("label");
			String url = childElement.attributeValue("url") == null ? "" : childElement.attributeValue("url");
			String process = childElement.attributeValue("process") == null ? "" : childElement.attributeValue("process");
			String activity = childElement.attributeValue("activity") == null ? "" : childElement.attributeValue("activity");
			String activityFName = parentFName + "/" + label;
			boolean isFolder = (process == "");

			if (isTree || !isFolder) {
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
			} else
				transRowData(childElement, resultElement, activityFName, isTree);
		}
	}
}
