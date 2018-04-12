import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;


public class GenQrCode implements com.justep.ui.JProcessor {

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
			genQCode(request,response);
		} catch (Exception e) {
			throw new ServletException("生成异常", e);
		}
		
	}
	
	public static void  genQCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String code =request.getParameter("code");
		int width = 90;
		if(request.getParameter("width")!=null)
			width = Integer.parseInt(request.getParameter("width"));
		int height = 90;
		if(request.getParameter("height")!=null)
			height = Integer.parseInt(request.getParameter("height"));
		String format = "png";
		Hashtable hints = new Hashtable();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
		hints.put(EncodeHintType.MARGIN, 0); 
		BitMatrix bitMatrix = new MultiFormatWriter().encode(code, BarcodeFormat.QR_CODE, width, height, hints);
		MatrixToImageWriter.writeToStream(bitMatrix, format,  response.getOutputStream() );
		response.getOutputStream().flush();
	}
	
	
}


