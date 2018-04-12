package com.butone.portal;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.JProcessor;

public class DoLogoutJP implements JProcessor {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String bsessionID = request.getParameter("bsessionid");

		ActionResult result = ActionEngine.logout(bsessionID, ActionUtils.JSON_CONTENT_TYPE);
		JSONObject content = (JSONObject) result.getContent();
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(content.toString().getBytes("UTF-8"));
		output.flush();
		output.close();

	}

}
