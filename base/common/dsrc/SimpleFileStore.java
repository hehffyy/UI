import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import com.justep.doc.DocHelper;
import com.justep.doc.RequestHelper;
import com.justep.ui.JustepConfig;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;

/**
 * attachmentSimple组件的简单文件存储，亦可用于非文档系统的文件存储。修改docStorePath即可
 * @author tangkj
 *
 */
public class SimpleFileStore extends com.justep.ui.impl.JProcessorImpl {
	static String docStorePath;
	static File docStoreDir;

	static {
		docStorePath = JustepConfig.getHome() + File.separator + "data" + File.separator + "attachmentSimple";
		File file = new File(docStorePath);
		if (!(file.exists() && file.isDirectory())) {
			file.mkdirs();
		}
		docStoreDir = file;
	}

	/**
		get为获取文件 浏览或者下载
	**/
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doGet(request, response);

		String operateType = request.getParameter("operateType");
		if ("copy".equals(operateType)) {
			this.copyFile(request, response);
		} else {
			this.getFile(request, response);
		}
	}

	private void copyFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String ownerID = request.getParameter("ownerID");
		String targetOwnerID = request.getParameter("targetOwnerID");
		String storeFileName = request.getParameter("storeFileName");
		File file = new File(docStorePath + File.separator + ownerID + File.separator + storeFileName);
		File targetFile = new File(docStorePath + File.separator + targetOwnerID + File.separator + storeFileName);
		FileUtils.copyFile(file, targetFile);
	}

	private static final int BUFFER_SIZE = 32768 * 8;

	private void getFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String ownerID = request.getParameter("ownerID");
		String realFileName = URLEncoder.encode(request.getParameter("realFileName"), "utf-8");
		String storeFileName = request.getParameter("storeFileName");
		String operateType = request.getParameter("operateType");
		/*String fileSize = request.getParameter("fileSize");*/

		File file = new File(docStorePath + File.separator + ownerID + File.separator + storeFileName);
		FileInputStream fis = new FileInputStream(file);

		/*response.setContentType(mimeType);*/
		/*response.setHeader("Content-Length", String.valueOf(part.getSize()));*/
		response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");

		String fileNameKey = "filename";
		UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
		if (Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {
			fileNameKey = "filename*";
		}
		if ("download".equals(operateType)) {
			response.addHeader("Content-Disposition", "attachment; " + fileNameKey + "=\"" + realFileName + "\"");
		} else {
			response.addHeader("Content-Disposition", "inline; " + fileNameKey + "=\"" + realFileName + "\"");
		}

		OutputStream os = response.getOutputStream();
		byte[] buffer = new byte[BUFFER_SIZE];
		try {
			int read;
			while ((read = fis.read(buffer)) != -1) {
				os.write(buffer, 0, read);
			}
		} finally {
			fis.close();
		}
	}

	/**
		post为上传
	**/
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);

		String contentType = request.getContentType();
		try {
			if ("application/octet-stream".equals(contentType)) {
				this.storeOctStreamFile(request, response);
			} else if (contentType != null && contentType.startsWith("multipart/")) {
				this.storeFile(request, response);
			} else {
				throw new RuntimeException("not supported contentType");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("storeFile异常");
		}
		response.getWriter().write("");
	}

	private void storeOctStreamFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		InputStream in = null;
		FileOutputStream storeStream = null;
		try {
			String ownerID = request.getParameter("ownerID");
			String storeFileName = request.getParameter("storeFileName");

			in = request.getInputStream();
			String storePath = docStorePath + File.separator + ownerID;
			DocHelper.getOrCreateFile(storePath);
			File toStoreFile = new File(storePath + File.separator + storeFileName);
			storeStream = new FileOutputStream(toStoreFile);
			IOUtils.copy(in, storeStream);
		} finally {
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(storeStream);
		}
	}

	private void storeFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HashMap<String, String> params = new HashMap<String, String>();
		List<FileItem> items = RequestHelper.parseMultipartRequest(request);
		Iterator<FileItem> iter = items.iterator();
		FileItem fileItem = null;
		while (iter.hasNext()) {
			FileItem item = iter.next();
			if (item.isFormField()) {
				String name = item.getFieldName();
				String value = item.getString();
				params.put(name, value);
			} else {
				/*String fieldName = item.getFieldName();
				String fileName = item.getName();
				String contentType = item.getContentType();
				boolean isInMemory = item.isInMemory();
				long sizeInBytes = item.getSize();*/
				fileItem = item;
			}
		}
		if (fileItem != null) {
			String storePath = docStorePath + File.separator + params.get("ownerID");
			File storeDir = new File(storePath);
			if (!(storeDir.exists() && storeDir.isDirectory())) {
				storeDir.mkdirs();
			}
			File toStoreFile = new File(storePath + File.separator + params.get("storeFileName"));
			fileItem.write(toStoreFile);
		}

	}
}
