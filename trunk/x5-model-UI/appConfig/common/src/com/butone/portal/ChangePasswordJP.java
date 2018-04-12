package com.butone.portal;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.JProcessor;

public class ChangePasswordJP implements JProcessor {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String new_password = request.getParameter("new_password");
		String language = request.getParameter("language");

		String bsessionID = request.getParameter("bsessionid");

		Action changeAction = new Action();
		changeAction.setProcess("/SA/OPM/system/systemProcess");
		changeAction.setActivity("mainActivity");
		changeAction.setName("changePasswordAction");
		changeAction.setParameter("name", username);
		changeAction.setParameter("opwd", password);
		changeAction.setParameter("npwd", new_password);

		ActionResult result = ActionEngine.invokeAction(changeAction, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);

		JSONObject content = (JSONObject) result.getContent();
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(content.toString().getBytes("UTF-8"));
		output.flush();
		output.close();

	}

}
