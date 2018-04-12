import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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

import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.Callback;
import com.justep.biz.client.StreamCallback;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.ui.util.InputStreamPartSource;
import com.justep.ui.util.NetUtils;

public class UploadEx implements com.justep.ui.JProcessor {
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			if (NetUtils.isRequestMultipart(request)) {
				Part[] parts = generateParts(request);
				String accept = NetUtils.getAccept(request);
				String contentType = NetUtils.getContentType(request);
				String bsessionID = NetUtils.getBSessionID(request);
				String language = NetUtils.getLanguage(request);
				Callback callback = new StreamCallback(response);
				ActionEngine.invokeActions(parts, accept, contentType, bsessionID, language, callback);
			}
		} catch (Exception e) {
			throw new ServletException("上传错误", e);
		}

		
	}
	
	public static Part[] generateParts(HttpServletRequest request)
			throws FileUploadException, IOException {
		// 临时文件目录
		File tempPathFile = new File(System.getProperty("java.io.tmpdir"));
		if (!tempPathFile.exists()) {
			tempPathFile.mkdirs();
		}
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(10 * 1024 * 1024);
		factory.setRepository(tempPathFile);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setSizeMax(500 * 1024 * 1024); // 设置最大文件尺寸500M
		upload.setHeaderEncoding("UTF-8");
		@SuppressWarnings("unchecked")
		List<FileItem> items = upload.parseRequest(request);
		Iterator<FileItem> iterator = items.iterator();
		List<Part> partList = new ArrayList<Part>();
		while (iterator.hasNext()) {
			FileItem fi = (FileItem) iterator.next();
			String fieldName = fi.getFieldName();
			if (!fi.isFormField()) {
				String fullFileName = fi.getName();
				if (fullFileName != null) {
					InputStreamPartSource bps = new InputStreamPartSource(
							fi.getInputStream(), fullFileName);
					partList.add(new FilePart(fieldName, bps));
					partList.add(new StringPart("fileName", fullFileName));
				}
			} else if("mapping".equals(fieldName)){
				String fieldValue = fi.getString();
				try{
					fieldValue = new String(fieldValue.getBytes("ISO-8859-1"),"UTF-8");
				}catch (Exception e) {}
				String fullFileName = FileSystemWrapper.instance().getRealPath(
						fieldValue);
				FileInputStream fis = new FileInputStream(fullFileName);
				InputStreamPartSource bps = new InputStreamPartSource(
						fis, fullFileName);
				partList.add(new FilePart(fieldName, bps));
			} else {
				String fieldValue = fi.getString();
				if (0 != fieldName.indexOf("$"))
					partList.add(new StringPart(fieldName, fieldValue));
			}
		}
		Part[] parts = new Part[partList.size()];
		int i = 0;
		for (Part part : partList) {
			parts[i] = part;
			i++;
		}
		return parts;
	}

}