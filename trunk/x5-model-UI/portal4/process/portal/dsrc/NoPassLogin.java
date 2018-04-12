import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.portal.controller.Controller;
import com.justep.ui.JustepConfig;
import com.justep.ui.system.service.portal.LoginAction;

public class NoPassLogin extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, Object> vars = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Map parameterMap = request.getParameterMap();
		if (parameterMap.containsKey("account")) {
			try {
				ActionResult ret = doQueryUserInfo(request);
				if (ret.isSuccess()) {
					// 查询用户名密码，跳转
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					JSONObject info = ((JSONObject) ret.getContent()).getJSONObject("data").getJSONObject("value");
					String href = request.getContextPath() + "/portal4/process/portal/directLogin.j?username=" + info.getString("c") + "&password="
							+ info.getString("p") + "&loginDate=" + sdf.format(new Date());
					System.out.println(href);
					response.sendRedirect(href);
					vars.put("redirect", true);
				} else {
					// 查询用户名密码失败，返回异常信息
					String info = "[{text:\"" + ret.getMessage() + "\",title:\"登陆\",status:\"ERROR\",code:\"system.UserController.login.2\"},"
							+ "{status:\"FAILURE\",data:\"{message:'" + ret.getMessage() + "'}\"}]";
					System.out.println(info);
					vars.put("info", info);
					addHtmlTemplateContentVariants(vars, request);
				}
			} catch (Exception e) {
				try {
					String href = request.getContextPath() + "/portal4/process/portal/login.w?";
					response.sendRedirect(href);
					vars.put("redirect", true);
				} catch (IOException e1) {
				}
			}

		} else if (parameterMap.containsKey("username") && parameterMap.containsKey("password")) {
			//尝试登陆
			ActionResult result = LoginAction.execute(request);
			//检查结果
			JSONObject content = (JSONObject) result.getContent();
			String language = request.getParameter("language");
			if (language == null || language.equals(""))
				language = "zh_CN";
			String client = request.getParameter("client");
			try {
				if (content.get("flag").toString().equals("false")) {
					String url = request.getContextPath() + "/portal4/process/portal/login.w";
					url += "?language=" + language;
					if (client != null)
						url += "&client=" + client;
					response.sendRedirect(url);
				} else {
					String bsid = result.getBSessionID();
					String url = request.getContextPath() + "/portal4/process/portal/index.w?bsessionid=" + bsid;
					url += "&language=" + language;
					url += "&activity=index&process=/portal4/process/portal/portalProcess";
					if (client != null)
						url += "&client=" + client;
					response.sendRedirect(url);
				}
			} catch (Exception e) {
				String url = request.getContextPath() + "/portal4/process/portal/login.w";
				url += url + "?language=" + language;
				if (client != null)
					url += "&client=" + client;
				response.sendRedirect(url);
			}
		} else {
			//获取用户信息
			String info = Controller.process("system/User/login", (HttpServletRequest) request);
			vars.put("info", info);
			addHtmlTemplateContentVariants(vars, request);
		}
	}

	private void addHtmlTemplateContentVariants(Map<String, Object> vars, HttpServletRequest request) {
		//
		String adURL = request.getParameter("ad");
		if (adURL == null)
			adURL = "";
		vars.put("adURL", "\"" + adURL + "\"");

		String client = request.getParameter("client");
		if (client == null)
			client = "";
		vars.put("client", "\"" + client + "\"");

		String language = request.getParameter("language");
		if (language == null)
			language = "";
		vars.put("language", "\"" + language + "\"");
	}

	private static ActionResult doQueryUserInfo(HttpServletRequest request) throws ServletException, IOException {
		String account = request.getParameter("account");
		String lang = request.getParameter("language");
		if ((lang == null) || (lang.equals("")))
			lang = "zh_CN";

		String responseType = "application/json";
		Action localAction = new Action();
		localAction.setProcess("/SA/OPM/system/systemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName("queryLoginUserInfoAction");
		localAction.setParameter("account", account);
		try {
			String url = JustepConfig.getBusinessServer() + "/login2";
			ActionResult ret = ActionEngine.invokeActions(url, null, localAction.asXML().getBytes("UTF-8"), null, responseType, "application/xml",
					null, lang, "post", null);
			return ret;
		} catch (Exception e) {

			String str = null;
			if ("application/json".equals(responseType))
				str = "{\"flag\": false, \"code\":\"\", \"message\": \"" + e.getMessage()
						+ "\", \"reason\":\"\", \"stack\":\"\", \"data\":\"\", \"messages\":\"\"}";
			else
				str = "<root><flag>false<flag><message>" + e.getMessage() + "</message><reason/><stack/><data/><messages/><root>";
			try {
				ByteArrayInputStream localByteArrayInputStream = new ByteArrayInputStream(str.getBytes("UTF-8"));
				return new ActionResult(localByteArrayInputStream, responseType, null);
			} catch (UnsupportedEncodingException ee) {
				e.printStackTrace();
			}
		}
		return null;
	}

}
