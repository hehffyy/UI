package com.butone.portal;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.LanguageEngine;
import com.justep.ui.system.service.permission.ProcessPermission;

public class WidgetList {
	public static Document execute(Set<ProcessPermission> processPermissions, String appName, String executor, String executorContext,
			String bSessionId, String language) {
		Document localDocument = getWidgets(appName, bSessionId, executor, executorContext, language);
		filterMenu(localDocument.getRootElement(), processPermissions);
		MenuUtils.deleteNullMenu(localDocument.getRootElement());
		return localDocument;

	}

	public static Document getWidgets(String appName, String bSessionId, String executor, String executorContext, String language) {
		ArrayList<Element> localArrayList = new ArrayList<Element>();
		List<String> localList1 = getWidgetFiles(appName, language);
		Iterator<String> itor = localList1.iterator();
		while (itor.hasNext()) {
			List<Element> localList2 = getWidget(itor.next());
			addWidget(localArrayList, localList2);
		}
		Document ret = DocumentHelper.createDocument();
		Element root = ret.addElement("root");
		root.setContent(localArrayList);
		MenuUtils.filter(root, bSessionId, executor, executorContext, language);
		return ret;
	}

	private static void filterMenu(Element paramElement, Set<ProcessPermission> paramSet) {
		if (paramElement == null)
			return;
		String str1 = paramElement.attributeValue("display");
		if ("hide".equalsIgnoreCase(str1)) {
			deleteItem(paramElement);
			return;
		}
		String str2 = paramElement.attributeValue("process");
		Object localObject2;
		if (str2 != null) {
			ProcessPermission permission = findPermission(str2, paramElement.attributeValue("activity"), paramSet);
			if ((!"solid".equalsIgnoreCase(str1)) && (permission == null)) {
				deleteItem(paramElement);
				return;
			}
			localObject2 = "1";
			if (permission != null)
				localObject2 = permission.getCount();
			paramElement.addAttribute("psmCount", (String) localObject2);
		}
		Iterator itor = paramElement.elements().iterator();
		while (itor.hasNext()) {
			filterMenu((Element) itor.next(), paramSet);
		}
	}

	private static ProcessPermission findPermission(String process, String activity, Set<ProcessPermission> paramSet) {
		if ((process == null) || (activity == null))
			return null;
		Iterator localIterator = paramSet.iterator();
		while (localIterator.hasNext()) {
			ProcessPermission localProcessPermission = (ProcessPermission) localIterator.next();
			if ((process.equals(localProcessPermission.getProcess()))
					&& (("*".equals(localProcessPermission.getActivity())) || (activity.equals(localProcessPermission.getActivity()))))
				return localProcessPermission;
		}
		return null;
	}

	private static void deleteItem(Element paramElement) {
		if (paramElement == null)
			return;
		Element localElement = paramElement.getParent();
		if (localElement == null)
			paramElement.getDocument().remove(paramElement);
		else
			localElement.remove(paramElement);
	}

	private static void addWidget(List<Element> paramList1, List<Element> paramList2) {
		if ((paramList1 != null) && (paramList2 != null)) {
			Iterator localIterator = paramList2.iterator();
			while (localIterator.hasNext()) {
				Element localElement1 = (Element) localIterator.next();
				Element localElement2 = findWidget(paramList1, localElement1);
				if (localElement2 == null)
					paramList1.add((Element) localElement1.clone());
				else
					addWidget(localElement2.elements(), localElement1.elements());
			}
		}
	}

	private static Element findWidget(List<Element> paramList, Element paramElement) {
		if ((paramList != null) && (paramElement != null)) {
			String str = paramElement.attributeValue("label");
			if (str == null)
				str = "";
			Iterator localIterator = paramList.iterator();
			while (localIterator.hasNext()) {
				Element localElement = (Element) localIterator.next();
				if (str.equals(localElement.attributeValue("label")))
					return localElement;
			}
		}
		return null;
	}

	private static List<Element> getWidget(String paramString) {
		SAXReader localSAXReader = new SAXReader();
		try {
			Document localDocument = localSAXReader.read(new URL(paramString));
			Element localElement = localDocument.getRootElement();
			return localElement.elements();
		} catch (Exception localException) {
			throw new RuntimeException("url: " + paramString, localException);
		}
	}

	private static List<String> getWidgetFiles(String appName, String paramString) {
		ArrayList<String> localArrayList = new ArrayList<String>();
		String str1 = (Utils.isEmptyString(appName) ? "/UI/appConfig/default" : "/UI/appConfig/" + appName);
		List<File> localList2 = FileSystemWrapper.instance().getFiles(FileSystemWrapper.instance().getRealPath(str1), true, ".widget.xml", false);
		Iterator<File> itor = localList2.iterator();
		while (itor.hasNext()) {
			File localFile = itor.next();
			String str4 = localFile.getName();
			String str5 = LanguageEngine.getLocalsResource(localFile.getParentFile().toURI().toString(), str4, paramString);
			localArrayList.add(str5);
		}
		return localArrayList;
	}

}
