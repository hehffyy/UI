import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.io.SAXReader;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.ui.LanguageEngine;
import com.justep.ui.exception.UIException;
import com.justep.ui.util.NetUtils;
import com.justep.ui.util.UIUtils;

public class NoticeWidget extends com.justep.ui.impl.JProcessorImpl {
	public static final String PROCESS = "/base/core/widgets/noticeWidget/noticeWidgetProcess";
	public static final String ACTIVITY = "mainActivity";
	private static final String VIEW = "/UI/base_X/core/widgets/noticeWidget/noticeInfo.xhtml";
	private static final String QUERY_NOTICEINFO_ACTION = "queryNoticeInfoAction";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Document taskDoc = queryWaitTasks(request);
		Document viewDoc = getView(request);
		String executor = NetUtils.getExecutor(request);
		if (executor == null) {
			executor = "";
		}
		taskDoc.getRootElement().addElement(NetUtils.EXECUTOR).addText(executor);
		Map<String, Object> params = new HashMap<String, Object>();
		Document result = UIUtils.xslt(viewDoc, taskDoc, params);
		UIUtils.ouputXHTML(request, response, result);
	}

	private Document getView(HttpServletRequest request) {
		try {
			String path = FileSystemWrapper.instance().getRealPath(VIEW);
			SAXReader reader = new SAXReader();
			Document result = reader.read(new File(path));
			LanguageEngine.execute(result.getRootElement(), LanguageEngine.getWindowPropertiesFile(VIEW, NetUtils.getLanguage(request)));
			return result;
		} catch (Exception e) {
			throw new UIException(e.getMessage(), e);
		}
	}

	private Document queryWaitTasks(HttpServletRequest request) {
		Action action = new Action();
		action.setProcess(PROCESS);
		action.setActivity(ACTIVITY);
		action.setName(QUERY_NOTICEINFO_ACTION);
		action.setExecutor(NetUtils.getExecutor(request));
		action.setExecuteContext(NetUtils.getExecuteContext(request));

		String bsessionID = NetUtils.getBSessionID(request);
		String language = NetUtils.getLanguage(request);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.XML_CONTENT_TYPE, bsessionID, language, null);
		return (Document) ar.getContent();
	}
}
