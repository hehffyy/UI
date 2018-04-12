package com.butone.portal;

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.LanguageEngine;
import com.justep.ui.system.service.permission.ProcessPermission;

public class FunctionTree {

	public static Element execute(Set<ProcessPermission> processPermissions, String appName, String executor, String executorContext,
			String bSessionId, String language) {
		Document localDocument = getMenus(appName, bSessionId, executor, executorContext, language);
		Element root = localDocument.getRootElement().createCopy();
		filterMenu(root, processPermissions);
		MenuUtils.deleteNullMenu(root);
		return root;
	}

	private static void filterMenu(Element paramElement, Set<ProcessPermission> paramSet) {
		if (paramElement == null)
			return;
		String str1 = paramElement.attributeValue("display");
		if ("hide".equalsIgnoreCase(str1)) {
			deleteItem(paramElement);
			return;
		}
		String process = paramElement.attributeValue("process");
		Object localObject2;
		if (process != null) {
			ProcessPermission permission = findPermission(process, paramElement.attributeValue("activity"), paramSet);
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
		if (paramElement.elements().size() == 0 && process == null) {
			deleteItem(paramElement);
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

	private static void deleteItem(Element element) {
		if (element == null)
			return;
		Element parent = element.getParent();
		if (parent != null) {
			parent.remove(element);
		} else if (element.getDocument() != null) {
			element.getDocument().remove(element);
		}
	}

	private static Map<String, Document> funcTrees = new ConcurrentHashMap<String, Document>();

	public synchronized static Document getMenus(String appName, String bSessionId, String executor, String executorContext, String language) {
		if (Utils.isEmptyString(appName))
			appName = "default";
		String fileName = FileSystemWrapper.instance().getRealPath("/UI/appConfig/" + appName + "/.release/release.function.xml");
		File file = new File(fileName);
		if (file.exists() && file.isFile()) {
			if (funcTrees.containsKey(appName)) {
				return (Document) funcTrees.get(appName).clone();
			} else {
				try {
					Document doc = new SAXReader().read(file);
					funcTrees.put(appName, doc);
					return (Document) doc.clone();
				} catch (Exception localException) {
					throw new RuntimeException(localException);
				}
			}
		} else {
			Document doc = compile(appName, bSessionId, executor, executorContext, language);
			funcTrees.put(appName, doc);
			AppConfigUtils.writeFile(doc, fileName, true);
			return (Document) doc.clone();
		}

	}

	private static Document compile(String appName, String bSessionId, String executor, String executorContext, String language) {
		ArrayList<Element> localArrayList = new ArrayList<Element>();
		List<String> localList1 = getMenuFiles(appName, language);
		Iterator<String> i = localList1.iterator();
		while (i.hasNext()) {
			String fileName = i.next();
			List<Element> localList2 = getMenu(fileName);
			addMenu(localArrayList, localList2);
		}
		Document ret = DocumentHelper.createDocument();
		Element root = ret.addElement("root");
		root.setContent(localArrayList);

		MenuUtils.filter(root, bSessionId, executor, executorContext, language);
		return sequence(appName, ret);
	}

	private static Document sequence(String appName, Document paramDocument) {
		if (null == paramDocument)
			return null;
		Document ret = DocumentHelper.createDocument();
		Element sequenceRoot = DocumentHelper.createElement("root");
		ret.setRootElement(sequenceRoot);

		String str1 = (Utils.isEmptyString(appName) ? "/UI/appConfig/default" : "/UI/appConfig/" + appName) + "/functionSequence.xml";
		File file = new File(FileSystemWrapper.instance().getRealPath(str1));
		if (file.exists()) {
			try {
				SAXReader localSAXReader = new SAXReader();
				Document localDocument2 = localSAXReader.read(file);
				Element localElement2 = localDocument2.getRootElement();
				List localList1 = localElement2.elements();
				if (null != localList1) {
					Iterator localIterator1 = localList1.iterator();
					while (localIterator1.hasNext()) {
						Object localObject1 = localIterator1.next();
						Element localElement3 = (Element) localObject1;
						String str2 = localElement3.attributeValue("label");
						List localList2 = paramDocument.selectNodes("/root/item[@label='" + str2 + "']");
						if (null != localList2) {
							Iterator localIterator2 = localList2.iterator();
							while (localIterator2.hasNext()) {
								Object localObject2 = localIterator2.next();
								Element srcElement = (Element) localObject2;
								sequenceRoot.add((Element) srcElement.clone());
								srcElement.getParent().remove(srcElement);
							}
						}
					}
				}
			} catch (Exception localException) {
				throw new RuntimeException(localException);
			}
			sequenceRoot.content().addAll(((Element) paramDocument.getRootElement().clone()).content());
			return ret;
		} else {
			return paramDocument;
		}
	}

	private static List<Element> getMenu(String paramString) {
		SAXReader localSAXReader = new SAXReader();
		try {
			Document localDocument = localSAXReader.read(new URL(paramString));
			Element localElement = localDocument.getRootElement();
			return localElement.elements();
		} catch (Exception localException) {
			throw new RuntimeException("url: " + paramString, localException);
		}
	}

	private static void addMenu(List<Element> paramList1, List<Element> paramList2) {
		if ((paramList1 != null) && (paramList2 != null)) {
			Iterator localIterator = paramList2.iterator();
			while (localIterator.hasNext()) {
				Element localElement1 = (Element) localIterator.next();
				Element localElement2 = findMenu(paramList1, localElement1);
				if (localElement2 == null)
					paramList1.add((Element) localElement1.clone());
				else
					addMenu(localElement2.elements(), localElement1.elements());
			}
		}
	}

	private static Element findMenu(List<Element> paramList, Element paramElement) {
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

	private static List<String> getMenuFiles(String appName, String language) {
		ArrayList<String> localArrayList = new ArrayList<String>();
		String str1 = Utils.isEmptyString(appName) ? "/UI/appConfig/default" : "/UI/appConfig/" + appName;
		List<File> funcFiles = FileSystemWrapper.instance().getFiles(FileSystemWrapper.instance().getRealPath(str1), true, ".function.xml", false);
		Iterator<File> i = funcFiles.iterator();
		while (i.hasNext()) {
			File localFile = i.next();
			String str4 = localFile.getName();
			String str5 = LanguageEngine.getLocalsResource(localFile.getParentFile().toURI().toString(), str4, language);
			localArrayList.add(str5);
		}
		return localArrayList;
	}

}