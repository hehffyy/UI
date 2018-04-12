import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.system.transform.Utils;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;

public class DownloadTmpFile extends com.justep.ui.impl.JProcessorImpl {
	private static Map<String, String> fileTypeMap = new HashMap<String, String>();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		service(request, response);
	}

	//Word字段下载
	private void service(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		try {
			String fileId = request.getParameter("fileId");
			String filePath = System.getProperty("java.io.tmpdir") + "\\" + fileId;

			response.setHeader("Pragma", "public");
			response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setDateHeader("Expires", 0);
			String filename = request.getParameter("$downloadFilename");
			String ext = request.getParameter("$fileExt");

			if (Utils.isNotEmptyString(filename) && filename.indexOf(".") >= 0) {
				ext = filename.substring(filename.lastIndexOf("."));
			}
			if (Utils.isEmptyString(filename)) {
				filename = fileId + (Utils.isNotEmptyString(ext) ? ext : "");
			}

			filename = java.net.URLEncoder.encode(filename, "UTF8");
			UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
			if (!Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {//这种写法支持ie和chrome
				response.addHeader("Content-disposition", "attachment;filename=\"" + filename + "\";");
			} else {//firefox特殊处理
				response.addHeader("Content-disposition", "attachment;filename*=\"" + filename + "\";");
			}
			if (Utils.isNotEmptyString(ext) && fileTypeMap.containsKey(ext)) {
				response.setContentType(fileTypeMap.get(ext));
			} else {
				response.setContentType("application/octet-stream");
			}

			// 文件名必须带后缀名，否则 下载后是未知类型的文件
			File file = new File(filePath);
			InputStream in = new FileInputStream(file);
			OutputStream out = response.getOutputStream();
			byte[] buff = new byte[1024 * 8];
			int len = -1;
			while ((len = in.read(buff)) != -1)
				out.write(buff, 0, len);
			in.close();
			out.flush();
		} catch (Exception e) {
			throw new ServletException("下载文件失败:" + e.getMessage(), e);
		}
	}

	static {
		fileTypeMap.put(".doc", "application/msword");
		fileTypeMap.put(".odt", "application/vnd.oasis.opendocument.text");
		fileTypeMap.put(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
		fileTypeMap.put(".xls", "application/vnd.ms-excel");
		fileTypeMap.put(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		fileTypeMap.put(".ppt", "application/vnd.ms-powerpoint");
		fileTypeMap.put(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
		fileTypeMap.put(".accdb", "application/msaccess");
		fileTypeMap.put(".rar", "application/x-zip-compressed");
		fileTypeMap.put(".jar", "application/x-zip-compressed");
		fileTypeMap.put(".zip", "application/x-zip-compressed");
		fileTypeMap.put(".txt", "text/plain");
		fileTypeMap.put(".text", "text/plain");
		fileTypeMap.put(".jsp", "text/plain");
		fileTypeMap.put(".java", "text/plain");
		fileTypeMap.put(".html", "text/html");
		fileTypeMap.put(".htm", "text/html");
		fileTypeMap.put(".xml", "text/xml");
		fileTypeMap.put(".css", "text/css");
		fileTypeMap.put(".rtf", "text/rtf");
		fileTypeMap.put(".wml", "text/vnd.wap.wml");
		fileTypeMap.put(".jpg", "image/jpg");
		fileTypeMap.put(".jpeg", "image/jpeg");
		fileTypeMap.put(".jpg", "image/jpeg");
		fileTypeMap.put(".jpe", "image/jpeg");
		fileTypeMap.put(".png", "image/png");
		fileTypeMap.put(".gif", "image/gif");
		fileTypeMap.put(".tiff", "image/tiff");
		fileTypeMap.put(".tif", "image/tiff");
		fileTypeMap.put(".svg", "image/svg+xml");
		fileTypeMap.put(".svgz", "image/svg+xml");
		fileTypeMap.put(".svg", "image/svg-xml");
		fileTypeMap.put(".pdf", "application/pdf");
		fileTypeMap.put(".wrl", "model/vrml");
		fileTypeMap.put(".smil", "application/smil");
		fileTypeMap.put(".js", "text/javascript");
		fileTypeMap.put(".vbs", "text/vbscript");
		fileTypeMap.put(".zip", "application/zip");
		fileTypeMap.put(".mp3", "audio/mpeg");
		fileTypeMap.put(".rdf", "text/rdf");
		fileTypeMap.put(".mov", "video/quicktime");
	}
}
