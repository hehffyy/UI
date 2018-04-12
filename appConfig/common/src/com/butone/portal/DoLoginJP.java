package com.butone.portal;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSONObject;
import com.butone.portal.TimeoutCache;
import com.butone.portal.TimeoutCache.OverdueRemoveListener;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.message.BusinessMessages;
import com.justep.ui.JProcessor;
import com.justep.ui.system.service.portal.LoginAction;

public class DoLoginJP implements JProcessor {

	/**
	 * 连续3次密码错误缓存(60秒)
	 */
	private static TimeoutCache<String, HttpSession> errorTimesWaiting = new TimeoutCache<String, HttpSession>();
	static {
		// 60秒后重置失败次数
		errorTimesWaiting.addOverdueRemoveListener(new OverdueRemoveListener<String, HttpSession>() {
			public void onRemove(String key, HttpSession session) {
				//System.out.println("remove session[" + key + "] from errorTimesWaiting");
				session.setAttribute("$loginError", 0);
			}
		});
	}

	/**
	 * 生成错误信息
	 * @param code
	 * @param message
	 * @param messages
	 * @return
	 */
	private JSONObject generateError(String code, String message, String... messages) {
		JSONObject error = new JSONObject();
		error.put("flag", false);
		error.put("code", code);
		error.put("message", message);
		error.put("messages", messages);
		return error;
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String validateCode = (String) request.getSession().getAttribute("$validateCode");

		if (validateCode != null && !validateCode.equalsIgnoreCase(request.getParameter("$vcode"))) {
			wirteResponse(response, generateError("BUTONE150001", "验证码错误"));
			return;
		}
		Long expireTime = (Long) request.getSession().getAttribute("$validateCodeExpireTime");
		if (expireTime != null && expireTime < System.currentTimeMillis()) {
			wirteResponse(response, generateError("BUTONE150002", "验证码已失效"));
			return;
		}

		if (errorTimesWaiting.containsKey(request.getSession().getId())) {
			long escapeTime = errorTimesWaiting.escapeTime(request.getSession().getId());
			if (escapeTime > 0) {
				wirteResponse(response, generateError("BUTONE150003", "3次登录名或密码错误，等待" + escapeTime + "秒", escapeTime + ""));
				return;
			}
		}

		ActionResult result = LoginAction.execute(request);
		JSONObject content = (JSONObject) result.getContent();

		if (content.getBooleanValue("flag")) {
			// 登录成功
			request.getSession().removeAttribute("$validateCode");
			request.getSession().removeAttribute("$validateCodeExpireTime");
			request.getSession().removeAttribute("$loginError");
		} else if (BusinessMessages.NAME_PASSWORD_ERROR.equals(content.getString("code"))) {
			// 登录失败
			int error = (request.getSession().getAttribute("$loginError") != null ? (Integer) request.getSession().getAttribute("$loginError") : 0) + 1;
			request.getSession().setAttribute("$loginError", error);
			if (error >= 3) {
				// 3次超限
				errorTimesWaiting.put(request.getSession().getId(), request.getSession(), 60 * 1000);
				wirteResponse(response, generateError("BUTONE150003", "3次登录名或密码错误，等待60秒", 60 + ""));
				return;
			}
		}
		content.put("bsessionid", result.getBSessionID());
		wirteResponse(response, content);

	}

	/**
	 * 写响应
	 * @param response
	 * @param content
	 * @throws ServletException
	 * @throws IOException
	 */
	private void wirteResponse(HttpServletResponse response, JSONObject content) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(content.toString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}
}
