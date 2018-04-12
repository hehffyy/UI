import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.common.MessageUtils;
import com.justep.system.transform.Utils;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.util.NetUtils;

public class GetPerson extends com.justep.ui.impl.JProcessorImpl {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		java.util.Date date = new java.util.Date();
		response.setDateHeader("Last-Modified", date.getTime());
		response.setDateHeader("Expires", date.getTime() + ((long) 1000 * 60 * 60 * 24));

		response.setHeader("Cache-Control", "public");
		response.setHeader("Pragma", "Pragma");

		String language = NetUtils.getLanguage(request);
		String accept = request.getHeader("Accept");
		String contentType = request.getContentType();
		String bsessionID = NetUtils.getBSessionID(request);
		Action action = new Action();
		action.setProcess("/base/system/process/bizSystem/bizSystemProcess");
		action.setActivity("mainActivity");
		action.setName("queryOPPersonAction");
		action.setParameter("offset", 0);
		action.setParameter("limit", 1);
		String columns = request.getParameter("columns");
		if (Utils.isNotEmptyString(columns) && !columns.contains("SA_OPPerson")) {
			columns = "SA_OPPerson," + columns;
		}
		action.setParameter("columns", columns);
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("id", request.getParameter("rowid"));
		action.setParameter("variables", variables);
		action.setParameter("filter", "SA_OPPerson=:id");
		action.setAccept(accept);
		ActionEngine.invokeAction(action, contentType, bsessionID, language, null);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);

		if (ar.isSuccess()) {
			JSONObject content = (JSONObject) ar.getContent();
			if (content.containsKey("sys"))
				content.remove("sys");
			response.setCharacterEncoding("UTF-8");
			response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
			PrintWriter out = response.getWriter();
			out.write(content.toString());
			out.flush();
		} else
			throw new ServletException(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.SERVICE_BIZ_ACTION_ERROR));
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}
