import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;

public class OfficeUpload extends com.justep.ui.impl.JProcessorImpl {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		uploadWord(request, response);
	}

	private void uploadWord(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		String tempFile = "";
		JSONObject resultJson = new JSONObject();
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");
		try {
			resultJson.put("sucess", true);
			// 获取上传的文件
			DiskFileItemFactory dis = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(dis);
			List<?> fileList = upload.parseRequest(request);
			Object[] obob = fileList.toArray();
			FileItem fileItem = (FileItem) obob[0];
			InputStream stream = fileItem.getInputStream();
			tempFile = copyFile(stream);
			String versionId = request.getParameter("versionId");
			String bsessionid = request.getParameter("bsessionid");
			String isTemplateStr = request.getParameter("isTemplate");
			String ext = getExtName(fileItem.getName());
			Boolean isTemplate = isTemplateStr != null && isTemplateStr.equalsIgnoreCase("TRUE");
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("versionId", versionId);
			params.put("tempFile", tempFile);
			params.put("ext", ext);
			params.put("isTemplate", isTemplate);
			ActionResult result = executeAction("checkInOffice", params, bsessionid);
			if (!result.isSuccess())
				throw new Exception(result.getMessage());
		} catch (Exception e) {
			try {
				resultJson.put("sucess", false);
				resultJson.put("content", e.getMessage());
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		} finally {
			try {
				File f = new File(tempFile);
				if (f.exists())
					f.delete();
				response.getWriter().append(resultJson.toString());
			} catch (Exception e) {
			}
		}

	}

	private static String getExtName(String s) {
		int i = s.lastIndexOf(".");
		int leg = s.length();
		return (i > 0 ? (i + 1) == leg ? " " : s.substring(i, s.length()) : " ");
	}

	public static String copyFile(InputStream inStream) throws Exception {
		String fileName = System.getProperty("java.io.tmpdir") + File.separator + UUID.randomUUID().toString() + ".tmp";
		File newFile = new File(fileName);
		int byteread = 0;
		FileOutputStream fs = null;
		try {
			newFile.createNewFile();

			fs = new FileOutputStream(newFile);
			byte[] buffer = new byte[1204];
			while ((byteread = inStream.read(buffer)) != -1) {
				fs.write(buffer, 0, byteread);
			}
			return fileName;
		} finally {
			if (inStream != null)
				try {
					inStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			if (fs != null)
				try {
					fs.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
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

}
