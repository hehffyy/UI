package com.butone.portal;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.Element;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.system.transform.Utils;

public class MenuUtils {
	public static void filter(Element paramElement, String bSessionId, String executor, String executorContext, String language) {
		Set<String> localSet = getApps(bSessionId, executor, executorContext, language);
		if (!localSet.isEmpty()) {
			filter(paramElement, localSet);
			deleteNullMenu(paramElement);
		}
	}

	public static void deleteNullMenu(Element paramElement) {
		List localList = paramElement.selectNodes("//item[not(./@url or .//item/@url)]");
		Iterator localIterator = localList.iterator();
		while (localIterator.hasNext()) {
			Element localElement1 = (Element) localIterator.next();
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

	private static Set<String> getApps(String paramString1, String paramString2, String paramString3, String paramString4) {
		Action localAction = new Action();
		localAction.setProcess("/SA/OPM/system/systemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName("getClientAppsAction");
		localAction.setExecutor(paramString2);
		localAction.setExecuteContext(paramString3);
		ActionResult localActionResult = ActionEngine.invokeAction(localAction, "application/xml", paramString1, paramString4, null);
		if (localActionResult.isSuccess()) {
			Element localElement1 = (Element) localActionResult.getDatas().get(0);
			HashSet<String> localHashSet = new HashSet<String>();
			Iterator localIterator = localElement1.selectNodes(".//*[local-name()='simple']").iterator();
			while (localIterator.hasNext()) {
				Element localElement2 = (Element) localIterator.next();
				if (Utils.isNotEmptyString(localElement2.getTextTrim()))
					localHashSet.add(localElement2.getTextTrim());
			}
			return localHashSet;
		}
		throw new RuntimeException(localActionResult.getMessage());
	}

	private static void filter(Element paramElement, Set<String> paramSet) {
		String str1 = paramElement.attributeValue("process");
		if (Utils.isNotEmptyString(str1)) {
			int i = 0;
			Iterator<String> itor = paramSet.iterator();
			while (itor.hasNext()) {
				String str2 = itor.next();
				if (str1.startsWith(str2)) {
					i = 1;
					break;
				}
			}
			if (i == 0) {
				paramElement.getParent().remove(paramElement);
				return;
			}
		}
		Iterator itor = paramElement.elements().iterator();
		while (itor.hasNext()) {
			Element item = (Element) itor.next();
			filter(item, paramSet);
		}
	}

}
