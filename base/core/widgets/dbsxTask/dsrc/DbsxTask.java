import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.util.NetUtils;

public class DbsxTask extends com.justep.ui.impl.JProcessorImpl {
	public static final String PROCESS = "/base/core/widgets/dbsxTask/dbsxTaskProcess";
	public static final String ACTIVITY = "mainActivity";
	private static final String QUERY_WAIT_TASK_ACTION = "queryDbsxTaskAction";

	private static final String VIEW_CSS = "/x5/UI/base/core/widgets/css/css.css";
	private static final String VIEW_JS_ONE = "/x5/UI/base/core/widgets/js/plug-in/jq/jquery.tmpl.js";
	private static final String VIEW_JS_TWO = "/x5/UI/base/core/widgets/js/widget.dbsxtask.js";

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		JSONObject obj = queryDbsxTaskAction(request);
		JSONObject data = obj.getJSONObject("data");
		String value = data.getString("value");
		System.out.println("开始加载待办事项，请等待...");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		pw.println("<html>");
		pw.println("<head>");
		pw.println("<link rel='stylesheet' type='text/css' href='" + VIEW_CSS + "'/>");
		pw.println("<script type='text/javascript' src='/x5/base/base.js' ></script>");
		pw.println("<script type='text/javascript' src='/x5/form/form.js' ></script>");
		pw.println("<script type='text/javascript' src='" + VIEW_JS_ONE + "'></script>");

		pw.println("<script type='text/javascript' src='" + VIEW_JS_TWO + "'></script>");
		pw.println("</head>");
		pw.println("<body>");
		pw.println("<div class='pro-item'></div>");
		pw.println("<script type='text/javascript'> window.initWidget(" + value + ")</script>");
		pw.println("</body>");
		pw.println("</html>");
	}

	private JSONObject queryDbsxTaskAction(HttpServletRequest request) {
		Action action = new Action();
		action.setProcess(PROCESS);
		action.setActivity(ACTIVITY);
		action.setName(QUERY_WAIT_TASK_ACTION);
		action.setExecutor(NetUtils.getExecutor(request));
		action.setExecuteContext(NetUtils.getExecuteContext(request));
		String bsessionID = NetUtils.getBSessionID(request);
		String language = NetUtils.getLanguage(request);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
		return (JSONObject) ar.getContent();
	}

}
