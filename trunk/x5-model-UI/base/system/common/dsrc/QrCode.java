import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;

import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.Callback;
import com.justep.biz.client.StreamCallback;
import com.justep.ui.util.NetUtils;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;


public class QrCode implements com.justep.ui.JProcessor {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.setHeader("Pragma", "public");
			response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setDateHeader("Expires", 0);
			response.setHeader("Content-Type", "image/png");
			UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
			if(!Browser.FIREFOX.equals(ua.getBrowser().getGroup())){//这种写法支持ie和chrome
				response.addHeader("Content-disposition", "inline;filename=\""
						+ "qcode.png" + "\";");
			}else{//firefox特殊处理
				response.addHeader("Content-disposition", "inline;filename*=\""
						+ "qcode.png" + "\";");
			}

			String accept = NetUtils.getAccept(request);
			String contentType = NetUtils.getContentType(request);
			String bsessionID = NetUtils.getBSessionID(request);
			String language = NetUtils.getLanguage(request);
			Callback callback = new DownloadStreamCallback(response);
			Part[] parts = generateParts(request);
			ActionEngine.invokeActions(parts, accept, contentType, bsessionID, language, callback);
		} catch (Exception e) {
			throw new ServletException("123", e);
		}
		
	}
	
	public static Part[] generateParts(HttpServletRequest request) throws FileUploadException, IOException {
		List<Part> partList = new ArrayList<Part>();
		partList.add(new StringPart("action", "genQCode"));
		String code =request.getParameter("code");
		code = java.net.URLEncoder.encode(code, "UTF8");
		partList.add(new StringPart("code", code));
		partList.add(new StringPart("process", "/base/system/process/bizSystem/bizSystemProcess"));
		partList.add(new StringPart("activity", "mainActivity"));
		Part[] parts = new Part[partList.size()];
		int i = 0;
		for (Part part : partList) {
			parts[i] = part;
			i++;
		}
		return parts;
	}
}


class DownloadStreamCallback extends StreamCallback{
	private HttpServletResponse httpResponse;
	public static final String JSON_CONTENT_TYPE = "application/json";
	public static final String XML_CONTENT_TYPE = "application/xml";
	public static final String BINARY_CONTENT_TYPE = "application/octet-stream";
	
	public DownloadStreamCallback(HttpServletResponse response) {
		super(response);
		httpResponse = response; 
	}
	
	public Object execute(InputStream in, String contentType, String bsessionID){
		try {
			if(contentType.contains(BINARY_CONTENT_TYPE)){
				OutputStream out = httpResponse.getOutputStream(); 
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
				throw new RuntimeException(msg);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}finally{
			if (in != null){
				try {
					in.close();
				} catch (IOException e) {
					
				}
			}
		}
	}
}