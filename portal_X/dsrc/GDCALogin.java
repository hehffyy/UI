import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.JustepConfig;

public class GDCALogin extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ActionResult ret = doQueryGDCAUserInfo(request);
		JSONObject content = (JSONObject) ret.getContent();
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

}
