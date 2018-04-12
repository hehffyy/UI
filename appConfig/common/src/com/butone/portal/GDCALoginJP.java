package com.butone.portal;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
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
import com.justep.message.UIMessages;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

public class GDCALoginJP extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String requestURL = request.getRequestURL().toString();
		boolean directLogin = !requestURL.contains(request.getContextPath() + "/portal/");
		ActionResult ret;
		if (directLogin)
			ret = doGDCALogin(request);
		else
			ret = doQueryGDCAUserInfo(request);
		JSONObject content = (JSONObject) ret.getContent();
		if (directLogin) {
			content.put("bsessionid", ret.getBSessionID());
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(content.toString().getBytes("UTF-8"));
		output.flush();
		output.close();

	}

	/**
	 * 查询GDCA关联用户信息
	 * @param request
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	public static ActionResult doQueryGDCAUserInfo(HttpServletRequest request) throws ServletException, IOException {
		String CAKeyId = request.getParameter("CAKeyId");
		String lang = request.getParameter("language");
		if ((lang == null) || (lang.equals("")))
			lang = "zh_CN";

		String responseType = "application/json";
		Action localAction = new Action();
		localAction.setProcess("/SA/OPM/system/systemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName("queryGDCALoginUserAction");
		localAction.setParameter("CAKeyId", CAKeyId);
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

	private ActionResult doGDCALogin(HttpServletRequest request) throws ServletException, IOException {
		String certData = request.getParameter("certData");
		String CAKeyId = request.getParameter("CAKeyId");
		String lang = request.getParameter("language");
		if ((lang == null) || (lang.equals("")))
			lang = "zh_CN";
		String ip = GDCALoginJP.getIP(request);
		HashMap<String, Object> options = getOptions(request);
		String client = request.getParameter("client");
		if (client != null)
			options.put("client", client);
		SimpleDateFormat localSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date loginTime;
		try {
			loginTime = localSimpleDateFormat.parse(request.getParameter("loginDate"));
		} catch (Exception localException) {
			throw new ServletException(MessageUtils.getMessage(UIMessages.class, "JUSTEP001015"));
		}
		ActionResult ret = executeLoginAction(CAKeyId, certData, ip, lang, loginTime, options, "application/json");
		return ret;
	}

	private ActionResult executeLoginAction(String CAKeyId, String certData, String ip, String lang, Date loginTime, Map<String, Object> options,
			String responseType) {
		responseType = responseType != null ? responseType : "application/xml";
		Action localAction = new Action();
		localAction.setProcess("/SA/OPM/system/systemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName("GDCALoginAction");
		localAction.setParameter("CAKeyId", CAKeyId);
		localAction.setParameter("certData", certData);
		localAction.setParameter("loginTime", new java.sql.Date(loginTime.getTime()));
		localAction.setParameter("ip", ip);
		localAction.setParameter("options", options);
		localAction.setParameter("lang", lang);
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

	private HashMap<String, Object> getOptions(HttpServletRequest request) {
		HashMap<String, Object> localHashMap = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Enumeration localEnumeration = request.getParameterNames();
		while (localEnumeration.hasMoreElements()) {
			String str1 = (String) localEnumeration.nextElement();
			if (str1.startsWith("options[")) {
				String str2 = str1.substring(str1.indexOf("[") + 1, str1.indexOf("]"));
				String str3 = request.getParameter(str1);
				localHashMap.put(str2, str3);
			}
		}
		if (!localHashMap.containsKey("DeviceType"))
			localHashMap.put("DeviceType", NetUtils.getDeviceType(request));
		if (!localHashMap.containsValue("OperatingSystem"))
			localHashMap.put("OperatingSystem", NetUtils.getOperatingSystem(request).toString());
		return localHashMap;
	}

	private static String getRemoteAddr(HttpServletRequest request) {
		String str = request.getHeader("X-Forwarded-For");
		if ((str == null) || (str.length() == 0) || ("unknown".equalsIgnoreCase(str)))
			str = request.getHeader("Proxy-Client-IP");
		if ((str == null) || (str.length() == 0) || ("unknown".equalsIgnoreCase(str)))
			str = request.getHeader("WL-Proxy-Client-IP");
		if ((str == null) || (str.length() == 0) || ("unknown".equalsIgnoreCase(str)))
			str = request.getHeader("HTTP_CLIENT_IP");
		if ((str == null) || (str.length() == 0) || ("unknown".equalsIgnoreCase(str)))
			str = request.getHeader("HTTP_X_FORWARDED_FOR");
		if ((str == null) || (str.length() == 0) || ("unknown".equalsIgnoreCase(str)))
			str = request.getRemoteAddr();
		return str;
	}

	public static String getIP(HttpServletRequest request) {
		Object localObject = request.getAttribute("ip");
		return localObject != null ? localObject.toString() : getRemoteAddr(request);
	}
}
