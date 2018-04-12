import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.Callback;
import com.justep.biz.client.StreamCallback;
import com.justep.common.MessageUtils;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.util.NetUtils;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;

public class FileExport implements com.justep.ui.JProcessor {

	class DownloadStreamCallback extends StreamCallback {
		private HttpServletResponse httpResponse;
		public static final String JSON_CONTENT_TYPE = "application/json";
		public static final String XML_CONTENT_TYPE = "application/xml";
		public static final String BINARY_CONTENT_TYPE = "application/octet-stream";

		public DownloadStreamCallback(HttpServletResponse response) {
			super(response);
			httpResponse = response;
		}

		public Object execute(InputStream in, String contentType, String bsessionID) {
			try {
				if (BINARY_CONTENT_TYPE.equals(contentType)) {
					OutputStream out = httpResponse.getOutputStream();
					//			httpResponse.setHeader("Content-length", out.);//文件大小
					byte[] bs = new byte[1024 * 8];
					int i = -1;
					while ((i = in.read(bs)) != -1) {
						out.write(bs, 0, i);
					}
					out.flush();
					return true;
				} else {
					ActionResult ar = new ActionResult(in, contentType, bsessionID);
					String msg = ar.getMessage();
					if (ar.isSessionTimeOut())
						msg = MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.XBL_BIZ_ACTION_TIMEOUT);
					throw new RuntimeException(msg);
				}
			} catch (IOException e) {
				throw new RuntimeException(e);
			} finally {
				if (in != null) {
					try {
						in.close();
					} catch (IOException e) {

					}
				}
			}
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.setHeader("Pragma", "public");
			response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setDateHeader("Expires", 0);
			String filename = request.getParameter("$downloadFilename");
			filename = (null == filename || "".equals(filename)) ? "download.dat" : filename;
			response.setHeader("Content-Type", "application/octet-stream");
			filename = java.net.URLEncoder.encode(filename, "UTF8");
			UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
			if (!Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {//这种写法支持ie和chrome
				response.addHeader("Content-disposition", "attachment;filename=\"" + filename + "\";");
			} else {//firefox特殊处理
				response.addHeader("Content-disposition", "attachment;filename*=\"" + filename + "\";");
			}

			String p = "";
			for (Object k : request.getParameterMap().keySet()) {
				String name = (String) k;
				if ("bsessionid".equalsIgnoreCase(name) || name.indexOf("$") == 0)
					continue;
				p += (!"".equals(p) ? "&" : "") + java.net.URLEncoder.encode(name, "utf-8") + "="
						+ java.net.URLEncoder.encode(request.getParameter(name), "utf-8");
			}
			String accept = NetUtils.getAccept(request);
			String contentType = NetUtils.getContentType(request);
			String bsessionID = NetUtils.getBSessionID(request);
			String language = NetUtils.getLanguage(request);
			Callback callback = new DownloadStreamCallback(response);
			ActionEngine.invokeActions(p, accept, contentType, bsessionID, language, callback);
		} catch (Exception e) {
			throw new ServletException(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.XBL_EXCEL_EXPORT_DOWNLOAD_ERROR), e);
		}

	}
}