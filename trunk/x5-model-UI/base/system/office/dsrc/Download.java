import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class Download extends com.justep.ui.impl.JProcessorImpl  {
	private static int bufferSize = 2048;
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException {
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException{
		downWord(request, response);
	}
	
	private static String getTempDir() {
		return System.getProperty("java.io.tmpdir");
	}
	
	//Word字段下载
	private void downWord(HttpServletRequest request,
			HttpServletResponse response) throws ServletException
			 {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");

			// 文件名必须带后缀名，否则 下载后是未知类型的文件
			String fileId= request.getParameter("fileId");
			String filePath = getTempDir()+"\\"+fileId;
			System.out.println(filePath);
			File file = new File(filePath);
			InputStream inputStream = new FileInputStream(file);
			response.reset();
			// 将 文件流写入到前端浏览器
			response.setHeader("Content-disposition",
					"attachment;filename=" + new String(file.getName().getBytes("GB2312"),"ISO_8859_1"));
			ServletOutputStream sops = response.getOutputStream();
			copyStream(inputStream, sops, true);
			inputStream.close();
			sops.close();
			inputStream = null;
			sops = null;

		} catch (Exception e) {
			throw new ServletException(e.getMessage());
		}
	}
	
	/**
	 * 复制流 到 前端浏览器
	 * 
	 * @param source
	 *            源文件输入流
	 * @param dest
	 *            输出流
	 * @param flush
	 * @return
	 */
	private static  long copyStream(InputStream source, OutputStream dest,
			boolean flush) {
		int bytes;
		long total = 0l;
		byte[] buffer = new byte[bufferSize];
		try {
			while ((bytes = source.read(buffer)) != -1) {
				if (bytes == 0) {
					bytes = source.read();
					if (bytes < 0)
						break;
					dest.write(bytes);
					if (flush)
						dest.flush();
					total += bytes;
				}
				dest.write(buffer, 0, bytes);
				if (flush)
					dest.flush();
				total += bytes;
			}

		} catch (IOException e) {
			throw new RuntimeException("IOException caught while copying.", e);
		}
		return total;
	}
}
