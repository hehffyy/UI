import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.butonex.system.SystemConst;
import com.butonex.utils.SysUtils;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionException;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.Callback;
import com.justep.common.MessageUtils;
import com.justep.message.UIMessages;
import com.justep.system.transform.Utils;
import com.justep.ui.LanguageEngine;
import com.justep.ui.exception.UIException;
import com.justep.ui.impl.JProcessorImpl;
import com.justep.ui.system.service.doc.DocUtils;
import com.justep.ui.util.NetUtils;

/**
 * 为NTKO组件重写上传代码
 * 
 * @author tangkj
 * 
 */
public class UploadDoc extends JProcessorImpl {
	private static final Logger log = Logger.getLogger(DocUtils.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		UploadDoc.service(request, response);
	}

	public static void service(HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse) throws ServletException {
		String bsessionid = NetUtils.getBSessionID(paramHttpServletRequest);
		String dochost = paramHttpServletRequest.getParameter("dochost");
		if (dochost.indexOf("?key=") == -1) {
			Cookie[] cookies = paramHttpServletRequest.getCookies();
			if (null != cookies)
				for (int i = 0; i < cookies.length; i++)
					if ("key".equals(cookies[i].getName())) {
						String str4 = cookies[i].getValue();
						dochost = dochost + "?key=" + str4;
						break;
					}
		}
		String beginTranctionKey = paramHttpServletRequest.getParameter("beginTranctionKey");

		if (Utils.isNotEmptyString(beginTranctionKey))
			beginTranction(beginTranctionKey, dochost, paramHttpServletRequest);
		String str4 = paramHttpServletRequest.getParameter("rType");
		dochost = dochost + "&bsessionid=" + bsessionid;
		if (-1 < dochost.indexOf("/file/cache/upload"))
			uploadDoc(dochost, paramHttpServletRequest, paramHttpServletResponse);
		else if (-1 < dochost.indexOf("/file/cache/office"))
			uploadDoc(dochost, paramHttpServletRequest, paramHttpServletResponse);
		else if ("test".equals(str4))
			testDocServer(paramHttpServletRequest, paramHttpServletResponse);
		else
			downLoadDoc(dochost, paramHttpServletRequest, paramHttpServletResponse);
	}

	public static void beginTranction(final String beginTranctionValue, String dochost, HttpServletRequest paramHttpServletRequest) {
		String str1 = paramHttpServletRequest.getHeader("Accept");
		String str2 = paramHttpServletRequest.getContentType();
		String str3 = LanguageEngine.getLanguage(paramHttpServletRequest);
		String str4 = NetUtils.getBSessionID(paramHttpServletRequest);
		try {
			if (dochost.contains("/file/")) {
				String str5 = dochost.substring(0, dochost.indexOf("/file/")) + "/file/beginTranction?beginTranctionKey=" + URLEncoder.encode(dochost, "UTF-8");
				ActionEngine.invokeActions(str5, null, null, null, str1, str2, str4, str3, "post", new Callback() {
					public Object execute(InputStream paramAnonymousInputStream, String paramAnonymousString1, String paramAnonymousString2) {
						try {
							ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
							byte[] arrayOfByte = new byte[262144];
							int i;
							while ((i = paramAnonymousInputStream.read(arrayOfByte)) != -1)
								localByteArrayOutputStream.write(arrayOfByte, 0, i);
							String str1 = localByteArrayOutputStream.toString();
							if (beginTranctionValue.equals(str1))
								return Boolean.valueOf(true);
							String msg = MessageUtils.getMessage(UIMessages.class, "JUSTEP001014", new Object[] { "md-01" });
							log.error("md-01[" + beginTranctionValue + "][" + str1 + "]");
							log.error(msg);
							throw new RuntimeException(msg);
						} catch (IOException localIOException) {
							localIOException.printStackTrace();
						}
						return null;
					}
				});
			}
		} catch (UnsupportedEncodingException localUnsupportedEncodingException) {
			localUnsupportedEncodingException.printStackTrace();
		}
	}

	private static final int BUFFER_SIZE = 262144;

	private static void downLoadDoc(String paramString, HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse) {
		HttpClient localHttpClient = new HttpClient(new HttpClientParams(), new SimpleHttpConnectionManager(true));
		GetMethod localGetMethod = new GetMethod(paramString);
		InputStream localInputStream = null;
		try {
			localHttpClient.executeMethod(localGetMethod);
			localInputStream = localGetMethod.getResponseBodyAsStream();
			Header[] localObject1 = localGetMethod.getResponseHeaders();
			for (Header localObject3 : localObject1)
				if (!"Set-Cookie".equalsIgnoreCase(localObject3.getName()))
					paramHttpServletResponse.setHeader(localObject3.getName(), localObject3.getValue());
			OutputStream localObject2 = paramHttpServletResponse.getOutputStream();
			byte[] arrayOfByte = new byte[BUFFER_SIZE];
			int len = -1;
			while ((len = localInputStream.read(arrayOfByte)) != -1) {
				localObject2.write(arrayOfByte, 0, len);
			}
		} catch (Exception localException) {
			throw new RuntimeException(MessageUtils.getMessage(UIMessages.class, "JUSTEP001011", new Object[] { localGetMethod.getStatusLine() }), localException);
		} finally {
			localGetMethod.releaseConnection();
			try {
				if (localInputStream != null)
					localInputStream.close();
			} catch (IOException localIOException2) {
				localIOException2.printStackTrace();
			}
		}
	}

	private static void uploadDoc(String docHost, HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse) throws ServletException {
		try {
			final Part[] docParts = NetUtils.generateParts(paramHttpServletRequest);
			String wmFileId = null;
			for (Part p : docParts) {
				if (p instanceof StringPart) {
					if (((StringPart) p).getName().equalsIgnoreCase("wmFileId")) {
						String partVal = (String) DocExHelper.getFieldValueByName("value", p);
						if (Utils.isNotEmptyString(partVal) && !"undefined".equals(partVal) && !"null".equals(partVal)) {
							wmFileId = partVal;
						}
					}
					break;
				}
			}

			// 水印处理
			if (wmFileId != null) {
				FilePart wmFile = null;
				for (Part p : docParts) {
					if (wmFile != null) {
						throw new UIException("文档添加水印暂不支持批量处理");
					}
					if (p instanceof FilePart) {
						wmFile = (FilePart) p;
					}
				}
				// 获得文件名
				Object source = DocExHelper.getFieldValueByName("source", wmFile);
				String fileName = DocExHelper.getFieldValueByName("fileName", source).toString();
				String ext = fileName.substring(fileName.lastIndexOf("."));
				// 获得文件流
				InputStream inputStream = (InputStream) DocExHelper.getFieldValueByName("in", source);
				// 产生水印
				List<String> list = DocExHelper.uploadWaterMark(inputStream, ext, wmFileId);
				// 记录水印
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("fileName", fileName);
				params.put("filePath", list.get(0));
				params.put("wmFileId", wmFileId);
				ActionResult callResult = DocExHelper.executeAction("genWmDoc", params, NetUtils.getBSessionID(paramHttpServletRequest));
				if (!callResult.isSuccess())
					throw new UIException(callResult.getMessage());
				// 如果是替换文件删除原来的文件
				JSONObject resultJson = (JSONObject) callResult.getContent();
				JSONObject resultDataJson = resultJson.getJSONObject("data");
				if (resultDataJson.containsKey("value")) {
					String dzFile = SystemConst.getDocExPath() + resultDataJson.getString("value");
					String dzFileExt = dzFile.substring(dzFile.lastIndexOf(".")).toUpperCase();
					String printFile = dzFile.toUpperCase().replace(dzFileExt.toUpperCase(), "") + "_print.pdf";
					SysUtils.deleteDir(new File(dzFile));
					SysUtils.deleteDir(new File(printFile));
				}
				// 替换
				fileName = fileName.replace(ext, "") + ".pdf";
				docParts[docParts.length - 1] = new FilePart(docParts[docParts.length - 1].getName(), fileName, new File(list.get(1)));
			}
			String language = LanguageEngine.getLanguage(paramHttpServletRequest);
			//String accept = paramHttpServletRequest.getHeader("Accept");
			String accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
			String contentType = paramHttpServletRequest.getContentType();
			String bSessionID = NetUtils.getBSessionID(paramHttpServletRequest);
			String useNTKO = paramHttpServletRequest.getParameter("useNTKO");
			// 通过HttpClient调用文档服务DocServer
			ActionEngine.invokeActions(docHost, null, null, docParts, accept, contentType, bSessionID, language, "post", new MyStreamCallback(paramHttpServletResponse, "true".equals(useNTKO)));

		} catch (Exception localException) {
			throw new UIException(localException.getMessage());
		}
	}

	private static void testDocServer(HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse) throws ServletException {
		try {
			String str1 = paramHttpServletRequest.getParameter("dochost");
			String str2 = paramHttpServletRequest.getHeader("Accept");
			String str3 = paramHttpServletRequest.getContentType();
			String str4 = LanguageEngine.getLanguage(paramHttpServletRequest);
			String str5 = NetUtils.getBSessionID(paramHttpServletRequest);
			String useNTKO = paramHttpServletRequest.getParameter("useNTKO");
			ActionEngine.invokeActions(str1, null, null, null, str2, str3, str5, str4, "get", new MyStreamCallback(paramHttpServletResponse, "true".equals(useNTKO)));
		} catch (Exception localException) {
			throw new ServletException(MessageUtils.getMessage(UIMessages.class, "JUSTEP001013"), localException);
		}
	}

	public static String inputStream2String(InputStream is) throws IOException {
		is.reset();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int i = -1;
		while ((i = is.read()) != -1) {
			baos.write(i);
		}
		return baos.toString("UTF-8");
	}

	public static ActionResult executeAction(String action, Map<String, Object> params, String bsessionid) {
		Action localAction = new Action();
		localAction.setProcess("/base/system/process/bizSystem/bizSystemProcess");
		localAction.setActivity("mainActivity");
		localAction.setName(action);
		Iterator<String> iter = params.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			localAction.setParameter(key, params.get(key));
		}
		return ActionEngine.invokeAction(localAction, com.justep.biz.client.ActionUtils.JSON_CONTENT_TYPE, bsessionid, "zh_CN", null);

	}

	static class MyStreamCallback implements Callback {
		private HttpServletResponse a;
		private boolean useNTKO;// 是否使用NTKO

		public MyStreamCallback(HttpServletResponse paramHttpServletResponse, boolean useNTKO) {
			this.a = paramHttpServletResponse;
			this.useNTKO = useNTKO;
		}

		public Object execute(InputStream paramInputStream, String contentType, String paramString2) {
			try {
				if (useNTKO) {
					this.a.reset();
					this.a.setHeader("Content-Type", "text/plain");

					ByteArrayOutputStream out = new ByteArrayOutputStream();
					byte[] arrayOfByte = new byte[8192];
					int i = -1;
					while ((i = paramInputStream.read(arrayOfByte)) != -1) {
						out.write(arrayOfByte, 0, i);
					}
					byte[] buff1 = out.toByteArray();
					byte[] buff2 = Arrays.copyOfRange(buff1, "EDA_STREAMBOUNDARY".getBytes().length, buff1.length - "EDA_STREAMBOUNDARY".getBytes().length);
					File tempPathFile = new File(System.getProperty("java.io.tmpdir"));
					if (!tempPathFile.exists()) {
						tempPathFile.mkdirs();
					}
					String resultID = UUID.randomUUID().toString();
					File file = new File(tempPathFile.getPath() + File.separator + resultID);
					file.createNewFile();
					FileOutputStream fileout = new FileOutputStream(file);
					fileout.write(buff2);
					fileout.flush();
					fileout.close();
					PrintWriter writer = this.a.getWriter();
					writer.write(resultID);
					return true;
				} else {
					if ((null != contentType) && (!"".equals(contentType)))
						this.a.setHeader("Content-Type", contentType);
					ServletOutputStream localServletOutputStream = this.a.getOutputStream();
					byte[] arrayOfByte = new byte[8192];
					int i = -1;
					while ((i = paramInputStream.read(arrayOfByte)) != -1) {
						localServletOutputStream.write(arrayOfByte, 0, i);
					}
					localServletOutputStream.flush();
					return true;
				}
			} catch (Exception localException) {
				throw ActionException.create(localException, "JUSTEP120033", new Object[0]);
			} finally {
				if (paramInputStream != null)
					try {
						paramInputStream.close();
					} catch (IOException localIOException2) {
					}
			}
		}
	}

	// /**
	// * 测试请求内容
	// * @param part
	// * @return
	// * @throws Exception
	// */
	// protected static Part testPart(Part part) throws Exception {
	// ByteArrayOutputStream out = new ByteArrayOutputStream();
	// if (part instanceof StringPart) {
	// part.send(out);
	// String txt = out.toString();
	// System.out.println(part.getName() + "=" + parsePartVaue(txt));
	// return part;
	// } else {
	// part.send(out);
	// System.out.println(part.getName() + "=" + out.toString("ISO-8859-1"));
	// Method m = part.getClass().getDeclaredMethod("getSource");
	// m.setAccessible(true);
	// InputStreamPartSource source = (InputStreamPartSource) m.invoke(part);
	// if (source.createInputStream().markSupported()) {
	// source.createInputStream().reset();
	// return part;
	// } else {
	// source = new InputStreamPartSource(new
	// ByteArrayInputStream(out.toByteArray()), source.getFileName());
	// return new FilePart(part.getName(), source);
	// }
	// }
	// }
	//
	// private static String parsePartVaue(String headerPart) {
	// int len = headerPart.length();
	// int start = 0;
	// while (true) {
	// int end = parseEndOfLine(headerPart, start);
	// if (start == end) {
	// break;
	// }
	// start = end + 2;
	// while (start < len) {
	// int nonWs = start;
	// while (nonWs < len) {
	// char c = headerPart.charAt(nonWs);
	// if ((c != ' ') && (c != '\t')) {
	// break;
	// }
	// nonWs++;
	// }
	// if (nonWs == start) {
	// break;
	// }
	// end = parseEndOfLine(headerPart, nonWs);
	// start = end + 2;
	// }
	// }
	// return headerPart.substring(start + 2, headerPart.length() - 2);
	// }
	//
	// private static int parseEndOfLine(String headerPart, int end) {
	// int index = end;
	// while (true) {
	// int offset = headerPart.indexOf('\r', index);
	// if ((offset == -1) || (offset + 1 >= headerPart.length())) {
	// throw new
	// IllegalStateException("Expected headers to be terminated by an empty line.");
	// }
	// if (headerPart.charAt(offset + 1) == '\n') {
	// return offset;
	// }
	// index = offset + 1;
	// }
	// }

}