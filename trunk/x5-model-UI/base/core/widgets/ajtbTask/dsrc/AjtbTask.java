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

public class AjtbTask extends com.justep.ui.impl.JProcessorImpl {
	public static final String PROCESS = "/base/core/widgets/ajtbTask/ajtbTaskProcess";
	public static final String ACTIVITY = "mainActivity";
	private static final String QUERY_WAIT_TASK_ACTION = "queryAjtbTaskAction";

	private static final String VIEW_CSS = "/x5/UI/base/core/widgets/css/css.css";
	private static final String VIEW_JS_ONE = "/x5/UI/base/core/widgets/js/plug-in/jq/jquery.tmpl.js";
	private static final String VIEW_JS_TWO = "/x5/UI/base/core/widgets/js/plug-in/echarts-all.js";
	private static final String VIEW_JS_THREE = "/x5/UI/base/core/widgets/js/plug-in/theme/blue.js";
	private static final String VIEW_JS_FOUR = "/x5/UI/base/core/widgets/js/widget.ajtbtask.js";

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			JSONObject obj = queryDbsxTaskAction(request);
			JSONObject data = obj.getJSONObject("data");
			String value = data.getString("value");
			request.setCharacterEncoding("utf-8");
			response.setContentType("text/html;charset=utf-8");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head>");
			pw.println("<link rel='stylesheet' type='text/css' href='" + VIEW_CSS + "'/>");
			pw.println("<script type='text/javascript' src='/x5/base/base.js' ></script>");
			//pw.println("<script type='text/javascript' src='/x5/form/form.js' ></script>");
			pw.println("<script type='text/javascript' src='" + VIEW_JS_ONE + "'></script>");
			pw.println("<script type='text/javascript' src='" + VIEW_JS_TWO + "'></script>");
			pw.println("<script type='text/javascript' src='" + VIEW_JS_THREE + "'></script>");

			pw.println("<script type='text/javascript' src='" + VIEW_JS_FOUR + "'></script>");
			pw.println("</head>");
			pw.println("<body>");
			pw.println("<div id='ajtb-box' class='bg1' style='height: 200px'></div>");
			pw.println("<script type='text/javascript'> window.initWidget(" + value + ")</script>");
			pw.println("</body>");
			pw.println("</html>");
		} catch (Exception e) {
			e.printStackTrace();
		}

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
