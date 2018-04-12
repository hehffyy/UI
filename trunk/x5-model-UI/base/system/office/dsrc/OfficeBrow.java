import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;

public class OfficeBrow extends com.justep.ui.impl.JProcessorImpl {
	private static int bufferSize = 2048;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		downWord(request, response);
	}

	//Word字段下载
	private void downWord(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");
			String template = request.getParameter("template");
			String versionId = request.getParameter("versionId");

			String bsessionid = request.getParameter("bsessionid");
			Map<String, Object> params = new HashMap<String, Object>();
			ActionResult actionResult = null;
			if (template != null) {
				params.put("template", template);
				actionResult = executeAction("browOfficeByTemplate", params, bsessionid);
			} else {
				params.put("versionId", versionId);
				actionResult = executeAction("browOffice", params, bsessionid);
			}
			if (!actionResult.isSuccess())
				throw new Exception(actionResult.getReason());
			JSONObject str = (JSONObject) actionResult.getDatas().get(0);
			String filePath = null == str.get("value") ? "" : str.get("value").toString();
			if (filePath == null)
				return;
			File file = new File(filePath.replaceAll("\\\\", "/"));
			InputStream inputStream = new FileInputStream(file);
			response.reset();
			String ext = file.getName().indexOf(".")>0?file.getName().substring(file.getName().indexOf(".")):"";
			// 将 文件流写入到前端浏览器
			response.setHeader("Content-disposition", "attachment;filename=dowload" + ext);
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

	public static ActionResult executeAction(String action, Map<String, Object> params, String bsessionid) {
		Action localAction = new Action();
		localAction.setProcess("/common/officeTemplate/process/template/templateProcess");
		localAction.setActivity("mainActivity");
		localAction.setName(action);
		Iterator<String> iter = params.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			localAction.setParameter(key, params.get(key));
		}
		return ActionEngine.invokeAction(localAction, com.justep.biz.client.ActionUtils.JSON_CONTENT_TYPE, bsessionid, "zh_CN", null);

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
	private static long copyStream(InputStream source, OutputStream dest, boolean flush) {
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