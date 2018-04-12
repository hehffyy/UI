import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.common.MessageUtils;
import com.justep.message.UIMessages;
import com.justep.ui.util.NetUtils;

/**
 * 不动产房屋户型图
 * @author tangkj
 *
 */
public class BdcHXT extends com.justep.ui.impl.JProcessorImpl {
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {

			String bsessionID = NetUtils.getBSessionID(request);
			String language = NetUtils.getLanguage(request);

			Action action = new Action();
			action.setProcess("/bdc/common/process/bdcService/bdcServiceProcess");
			action.setActivity("mainActivity");
			action.setName("getHxtImageUrlAction");
			action.setParameter("bizRecId", request.getParameter("bizRecId"));
			ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
			if (ar.isSuccess()) {
				String ret = (String) ar.getDatas().get(0);
				if ("".equals(ret)) {
					response.sendError(HttpServletResponse.SC_FOUND);
				} else {
					responseImage(request, response, ret);
				}
			} else {
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			}

		} catch (Exception e) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

	private void responseImage(HttpServletRequest request, HttpServletResponse response, String imageUrl) throws IOException {
		//		response.setHeader("Pragma", "public");
		//		response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");
		//		response.setHeader("Content-Transfer-Encoding", "binary");
		//		response.setDateHeader("Expires", 0);
		//		response.setHeader("Content-Type", "image/png");
		//		UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
		//		if (!Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {//这种写法支持ie和chrome
		//			response.addHeader("Content-disposition", "inline;filename=\"" + "hxt.bmp" + "\";");
		//		} else {//firefox特殊处理
		//			response.addHeader("Content-disposition", "inline;filename*=\"" + "hxt.bmp" + "\";");
		//		}
		//		downloadImage(response, imageUrl);
		HttpClient localHttpClient = new HttpClient(new HttpClientParams(), new SimpleHttpConnectionManager(true));
		GetMethod localGetMethod = new GetMethod(imageUrl);
		InputStream localInputStream = null;
		try {
			localHttpClient.executeMethod(localGetMethod);
			localInputStream = localGetMethod.getResponseBodyAsStream();
			Header[] localObject1 = localGetMethod.getResponseHeaders();
			for (Header localObject3 : localObject1)
				if (!"Set-Cookie".equalsIgnoreCase(localObject3.getName()))
					response.setHeader(localObject3.getName(), localObject3.getValue());
			OutputStream localObject2 = response.getOutputStream();
			byte[] arrayOfByte = new byte[4096];
			int len = -1;
			while ((len = localInputStream.read(arrayOfByte)) != -1) {
				localObject2.write(arrayOfByte, 0, len);
			}
		} catch (Exception localException) {
			throw new RuntimeException(MessageUtils.getMessage(UIMessages.class, "JUSTEP001011", new Object[] { localGetMethod.getStatusLine() }),
					localException);
		} finally {
			localGetMethod.releaseConnection();
			try {
				if (localInputStream != null)
					localInputStream.close();
			} catch (IOException localIOException2) {
				localIOException2.printStackTrace();
			}
		}
	}

}
