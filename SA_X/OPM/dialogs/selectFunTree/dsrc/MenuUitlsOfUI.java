

import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.LanguageEngine;
import com.justep.ui.resources.ResourceManagerWrapper;

public class MenuUitlsOfUI {
	  private static final String FUNCTION_CONFIG = "/UI/system_X/service/permission/functionMenu.config.xml";
	  private static final String MENU_FILE_PATH_DIR = "fun-file-path-dir";
	  private static final String MENU_FILE_POSTFIX = ".function.xml";
	  private static final String MENU_FILE_DIR = "/config/";
	  private static final String FUNCTION_SEQUENCE_FILE = "/UI/system/config/functionSequence.xml";
	  private static final String PORTAL_FUNCTION_CONFIG = "/mobileUI/system/service/permission/function.config.xml";
	  private static final String PORTAL_FUNCTION_SEQUENCE_FILE = "/mobileUI/system/config/functionSequence.xml";
	  private static boolean forPortal;
	private static Set<String> getApps(String paramString1, String paramString2, String paramString3, String paramString4)
	  {
		Action localAction = new Action();
		localAction.setProcess("/SA/OPM/system/systemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName("getClientAppsAction");
		localAction.setExecutor(paramString2);
		localAction.setExecuteContext(paramString3);
		ActionResult localActionResult = ActionEngine.invokeAction(localAction, "application/xml", paramString1, paramString4, null);
		if (localActionResult.isSuccess()) {
			Element localElement1 = (Element) localActionResult.getDatas().get(0);
			HashSet localHashSet = new HashSet();
			Iterator localIterator =  localElement1.selectNodes(".//*[local-name()='simple']").iterator();
			while (localIterator.hasNext()) {
				Object localObject = localIterator.next();
				Element localElement2 = (Element) localObject;
				if (Utils.isNotEmptyString(localElement2.getTextTrim()))
					localHashSet.add(localElement2.getTextTrim());
			}
			return localHashSet;
		}
		throw new RuntimeException(localActionResult.getMessage());
	  }

	public static void filter(Element paramElement, String paramString1, String paramString2, String paramString3, String paramString4) {
		Set localSet = getApps(paramString1, paramString2, paramString3, paramString4);
		if (!(localSet.isEmpty())) {
			filter(paramElement, localSet);
			deleteNullMenu(paramElement);
		}
	}

	private static void deleteNullMenu(Element paramElement) {
		List localList = paramElement.selectNodes("//item[not(./@url or .//item/@url)]");
		Iterator localIterator = localList.iterator();
		while (localIterator.hasNext()) {
			Object localObject = localIterator.next();
			Element localElement1 = (Element) localObject;
			Element localElement2 = localElement1.getParent();
			if (localElement2 != null) {
				localElement2.remove(localElement1);
			} else {
				Document localDocument = localElement1.getDocument();
				if (localDocument != null)
					localDocument.remove(localElement1);
			}
		}
	}

	private static void filter(Element paramElement, Set<String> paramSet) {
		Object localObject;
		String str1 = paramElement.attributeValue("process");
		if (Utils.isNotEmptyString(str1)) {
			int i = 0;
			localObject = paramSet.iterator();
			while (((Iterator) localObject).hasNext()) {
				String str2 = (String) ((Iterator) localObject).next();
				if (str1.startsWith(str2))
					i = 1;
			}
			if (i == 0) {
				paramElement.getParent().remove(paramElement);
				return;
			}
		}
		Iterator localIterator = paramElement.elements().iterator();
		while (localIterator.hasNext()) {
			localObject = localIterator.next();
			filter((Element) localObject, paramSet);
		}
	}

	public static Document getMenus(String paramString1, String paramString2, String paramString3, String paramString4) {
		forPortal = false;
		ArrayList localArrayList = new ArrayList();
		List localList1 = getMenuFiles(paramString4);
		Object localObject1 = localList1.iterator();
		while (((Iterator) localObject1).hasNext()) {
			String localObject2 = (String) ((Iterator) localObject1).next();
			List localList2 = getMenu((String) localObject2);
			addMenu(localArrayList, localList2);
		}
		localObject1 = DocumentHelper.createDocument();
		Object localObject2 = ((Document) localObject1).addElement("root");
		((Element) localObject2).setContent(localArrayList);
		filter((Element) localObject2, paramString1, paramString2, paramString3, paramString4);
		return ((Document) (Document) sequence((Document) localObject1));
	}

	public static Document getMenusForPortal(String paramString1, String paramString2, String paramString3, String paramString4) {
		forPortal = true;
		ArrayList localArrayList = new ArrayList();
		List localList1 = getMenuFiles(paramString4);
		Object localObject1 = localList1.iterator();
		while (((Iterator) localObject1).hasNext()) {
			String localObject2 = (String) ((Iterator) localObject1).next();
			List localList2 = getMenu((String) localObject2);
			addMenu(localArrayList, localList2);
		}
		localObject1 = DocumentHelper.createDocument();
		Object localObject2 = ((Document) localObject1).addElement("root");
		((Element) localObject2).setContent(localArrayList);
		filter((Element) localObject2, paramString1, paramString2, paramString3, paramString4);
		return ((Document) (Document) sequence((Document) localObject1));
	}

	private static Document sequence(Document paramDocument) {
		Document localDocument1 = DocumentHelper.createDocument();
		Element localElement1 = DocumentHelper.createElement("root");
		localDocument1.setRootElement(localElement1);
		if (null != paramDocument) {
			String str1 = FileSystemWrapper.instance().getRealPath(
					(forPortal) ? PORTAL_FUNCTION_SEQUENCE_FILE : FUNCTION_SEQUENCE_FILE);
			try {
				SAXReader localSAXReader = new SAXReader();
				Document localDocument2 = localSAXReader.read(new File(str1));
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
								Element localElement4 = (Element) localObject2;
								localElement1.add((Element) localElement4.clone());
								localElement4.getParent().remove(localElement4);
							}
						}
					}
				}
			} catch (Exception localException) {
				throw new RuntimeException(localException);
			}
			localElement1.content().addAll(((Element) paramDocument.getRootElement().clone()).content());
		}
		return localDocument1;
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

	private static List<String> getMenuFiles(String paramString) {
		ArrayList localArrayList = new ArrayList();
		String str1 = getConfigRoot();
		if (str1 != null) {
			List localList1 = FileSystemWrapper.instance().getDirs(str1);
			Iterator localIterator1 = localList1.iterator();
			while (localIterator1.hasNext()) {
				String str2 = (String) localIterator1.next();

				String str3 = str2 + MENU_FILE_DIR;
				List localList2 = FileSystemWrapper.instance().getFiles(str3, true, MENU_FILE_POSTFIX, false);
				Iterator localIterator2 = localList2.iterator();
				while (localIterator2.hasNext()) {
					File localFile = (File) localIterator2.next();
					String str4 = localFile.getName();
					String str5 = LanguageEngine.getLocalsResource(localFile.getParentFile().toURI().toString(), str4, paramString);
					localArrayList.add(str5);
				}
			}
		}
		return localArrayList;
	}

	private static String getConfigRoot() {
		Document localDocument = ResourceManagerWrapper.instance().getContentAsDOM4J(
				(forPortal) ? PORTAL_FUNCTION_CONFIG : FUNCTION_CONFIG);
		if ((localDocument != null) && (localDocument.getRootElement() != null))
			return localDocument.getRootElement().elementTextTrim(MENU_FILE_PATH_DIR);
		return null;
	}
}