import java.lang.System;
import java.io.IOException;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.common.SystemUtils;
import com.justep.ui.ActivityServer;
import com.justep.ui.util.NetUtils;


public class Activity2WURL implements com.justep.ui.JProcessor{
	
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String aurl = request.getParameter("aurl");
		String result = aurl;
		try{
			if (SystemUtils.isNotEmptyString(aurl)){
				String contextPath = request.getContextPath();
				if (aurl.startsWith(contextPath + "/")){
					aurl = aurl.substring(contextPath.length());
				}
				if (aurl.startsWith("/") && NetUtils.isVLS(aurl.split("/")[1])){
					aurl = aurl.substring(aurl.indexOf("/", 1));
				}
				result = ActivityServer.getWindowURLByA(request, aurl, NetUtils.getDeviceType(request));
			}
		}catch (Error err){
			result = null;
		}catch (Exception e){
			result = null;
		}
		
		if (result == null) result = "no";
		
		response.setDateHeader("Last-Modified", System.currentTimeMillis());
		response.setDateHeader("Expires", System.currentTimeMillis() + 604800000L);
		response.setHeader("Cache-Control", "public");
		
		Writer writer = null;
		try{
			writer = response.getWriter();
			writer.append(result);
		}catch(Exception e){
			
		}finally{
			if (writer != null)
				try {
					writer.close();
				} catch (IOException e) {
					
				}	
		}
	}
	
}
