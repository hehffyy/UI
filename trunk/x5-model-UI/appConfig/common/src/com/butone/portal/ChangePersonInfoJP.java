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
import com.justep.ui.util.NetUtils;


public class ChangePersonInfoJP implements JProcessor {
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String operate = request.getParameter("operate");
		String language = request.getParameter("language");
		String bsessionID = NetUtils.getBSessionID(request);
		Action changeAction = new Action();
		changeAction.setProcess("/base/system/process/bizSystem/bizSystemProcess");
		changeAction.setActivity("mainActivity");
		if(operate.equals("getInfo"))
			changeAction.setName("getPersonInfoAction");
		else {
			changeAction.setName("changePersonInfoAction");
			changeAction.setParameter("telPhone", request.getParameter("telPhone"));
			changeAction.setParameter("mobilePhone", request.getParameter("mobilePhone"));
			changeAction.setParameter("postalCode", request.getParameter("postalCode"));
		}
		changeAction.setParameter("userName", request.getParameter("userName"));
		ActionResult result = ActionEngine.invokeAction(changeAction, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
		JSONObject content = (JSONObject)result.getContent();
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(content.toString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}
}
