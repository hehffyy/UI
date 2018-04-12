package com.butone.portal;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionResult;
import com.justep.ui.JProcessor;
import com.justep.ui.system.service.portal.LoginAction;

public class DirectLoginJP implements JProcessor {
	protected String portal = "portal2";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//尝试登陆
		ActionResult result = LoginAction.execute(request);
		//检查结果
		JSONObject content = (JSONObject) result.getContent();
		String language = request.getParameter("language");
		String appName = request.getParameter("appName");
		if (language == null || language.equals(""))
			language = "zh_CN";
		String client = request.getParameter("client");
		String url = request.getContextPath();
		String param = "?language=" + language;
		if (client != null)
			param += "&client=" + client;
		if (appName != null)
			param += "&appName=" + appName;
		try {
			if (content.get("flag").toString().equals("false")) {
				url += "/" + portal + "/process/portal/login.w";
			} else {
				url += "/" + portal + "/process/portal/index.w";
				param += "&bsessionid=" + result.getBSessionID() + "&activity=index&process=/portal2/process/portal/portalProcess";
			}
		} catch (Exception e) {
			url += request.getContextPath() + "/" + portal + "/process/portal/login.w";
		}
		response.sendRedirect(url + param);

	}

}
