import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;
import org.dom4j.Document;
import org.dom4j.Element;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.common.MessageUtils;
import com.justep.ui.util.InputStreamPartSource;
import com.justep.ui.util.NetUtils;

public class AttachUpload implements com.justep.ui.JProcessor {
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json; charset=utf-8");
			if (NetUtils.isRequestMultipart(request)) {
				Part[] parts = generateParts(request);
				String accept = NetUtils.getAccept(request);
				String contentType = NetUtils.getContentType(request);
				String bsessionID = NetUtils.getBSessionID(request);
				String language = NetUtils.getLanguage(request);
				ActionResult actionResult = ActionEngine.invokeActions(parts, accept, contentType, bsessionID, language, null);
				if (actionResult.isSuccess()) {
					OutputStream out = response.getOutputStream();
					Object obj = actionResult.getDatas().get(0);
					if (obj instanceof JSON) {
						out.write(JSON.toJSONBytes(obj));
					} else {
						out.write(JSON.toJSONBytes(((Element) obj).getText().getBytes()));
					}
					out.flush();
				} else {
					throw new ServletException(actionResult.getMessage());
				}
			}
		} catch (Exception e) {
			throw new ServletException("上传失败", e);
		}

	}

	public static Part[] generateParts(HttpServletRequest request) throws FileUploadException, IOException {
		// 临时文件目录
		File tempPathFile = new File(System.getProperty("java.io.tmpdir"));
		if (!tempPathFile.exists()) {
			tempPathFile.mkdirs();
		}
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(10 * 1024 * 1024);
		factory.setRepository(tempPathFile);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(500 * 1024 * 1024); // 设置最大文件尺寸500M7
		upload.setHeaderEncoding("UTF-8");
		@SuppressWarnings("unchecked")
		List<FileItem> items = upload.parseRequest(request);
		Iterator<FileItem> iterator = items.iterator();
		List<Part> partList = new ArrayList<Part>();
		String fileName = null;
		while (iterator.hasNext()) {
			FileItem fi = (FileItem) iterator.next();
			String fieldName = fi.getFieldName();
			if (!fi.isFormField()) {
				String fullFileName = fi.getName();
				if (fileName != null)
					fullFileName = fileName;
				if (request.getParameter("fileName") != null) {
					fullFileName = request.getParameter("fileName");
					fullFileName = URLEncoder.encode(fullFileName, "utf-8");
				}
				if (fullFileName != null) {
					InputStreamPartSource bps = new InputStreamPartSource(fi.getInputStream(), fullFileName);
					partList.add(new FilePart("input", bps));
					partList.add(new StringPart("fileName", fullFileName));
				}
			} else {
				String fieldValue = fi.getString();
				fieldValue = new String(fieldValue.getBytes("ISO-8859-1"), "UTF-8");
				if (fieldName.equalsIgnoreCase("fileName")) {
					fileName = fieldValue;
					fileName = URLEncoder.encode(fileName, "utf-8");
				}
			}
		}
		String subPath = request.getParameter("subPath");
		partList.add(new StringPart("action", "uploadDocExAction"));
		partList.add(new StringPart("subPath", URLEncoder.encode(subPath, "utf-8")));
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
