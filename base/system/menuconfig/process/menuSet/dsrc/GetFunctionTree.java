import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.LanguageEngine;
import com.justep.ui.resources.ResourceManagerWrapper;
import com.justep.ui.impl.JProcessorImpl;
import com.justep.ui.util.NetUtils;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;

public class GetFunctionTree extends JProcessorImpl {

	  private static boolean forPortal;
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);
		String type = request.getParameter("type");
		
		Document domMenus = MenuUitls.getMenus(NetUtils.getBSessionID(request),
				NetUtils.getExecutor(request), 
				NetUtils.getExecuteContext(request),
				NetUtils.getLanguage(request));
		Element elmTreeRoot = (Element) domMenus.selectSingleNode("/root");
 
		Document domRows = DocumentHelper.createDocument(org.dom4j.DocumentHelper
				.createElement("rows"));
		Element elmRows = domRows.getRootElement();
		
		boolean isTree = "tree".equals(type);
		transRowData(elmTreeRoot, elmRows, "", isTree);
		
//		System.out.println(domRows.asXML());
		
		response.setContentType("text/xml");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(domRows.asXML());
	}

	private boolean isExist(Element node,String name){
		if(node.getParent()==null) return false ;
		if(node.attributeValue("label").equals(name)){
			return true;
		}
		return isExist(node.getParent(),  name); 
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
			//这些功能都是系统功能,不需要配置,菜单配置只配置业务功能
			if (isExist(childElement, "平台案例") || isExist(childElement, "OA")|| isExist(childElement, "OA管理") 
					|| isExist(childElement, "协同平台") || isExist(childElement, "模型管理")
					|| isExist(childElement, "业务配置") || isExist(childElement, "公文办理")) {
				continue;
			}
  			
			String id = childElement.attributeValue("access_id") == null ? UUID.randomUUID().toString() : childElement.attributeValue("access_id");
			String label = childElement.attributeValue("label") == null ? "" : childElement
					.attributeValue("label");
			String icon16 = childElement.attributeValue("icon16") == null ? "" : childElement
					.attributeValue("icon16");
			String icon32 = childElement.attributeValue("icon32") == null ? "" : childElement
					.attributeValue("icon32");
			String icon64 = childElement.attributeValue("icon64") == null ? "" : childElement
					.attributeValue("icon64");
			String display = childElement.attributeValue("display") == null ? "" : childElement
					.attributeValue("display"); 
			String url = childElement.attributeValue("url") == null ? "" : childElement
					.attributeValue("url"); 
			String process = childElement.attributeValue("process") == null ? "" : childElement
					.attributeValue("process"); 
			String activity = childElement.attributeValue("activity") == null ? "" : childElement
					.attributeValue("activity"); 
			String activityFName = parentFName + "/" + label;
			boolean isFolder = (process == "");
			
			if (isTree || !isFolder) {
				Element rowElement = resultElement.addElement("row");
				rowElement.addAttribute("id", id);
				rowElement.addElement("cell");
				rowElement.addElement("cell").addText(label);
				rowElement.addElement("cell").addText(icon16);
				rowElement.addElement("cell").addText(icon32);
				rowElement.addElement("cell").addText(icon64);
				rowElement.addElement("cell").addText(display);
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
