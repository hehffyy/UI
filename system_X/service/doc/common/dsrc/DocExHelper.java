import java.io.File;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.butonex.doc.DocExUtils;
import com.butonex.system.SystemConst;
import com.butonex.utils.SysUtils;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.yufei.cc.GTwatermark;

public class DocExHelper {

	public static List<String> uploadWaterMark(InputStream in, String ext, String wmFileId) throws Exception {
		//根据ext 判断是否能进行水印处理
		if (!ext.equalsIgnoreCase(".doc") && !ext.equalsIgnoreCase(".docx") && !ext.equalsIgnoreCase(".pdf"))
			throw new RuntimeException("所上传文件类型不支持水印处理");
		List<String> list = new ArrayList<String>();
		String fileName = "";
		String printFileName = "";
		try {
			fileName = DocExUtils.uploadFile("WATERMARK", in, ext);
			list.add(fileName + "");
			fileName = SystemConst.getDocExPath() + fileName;
			printFileName = fileName.toUpperCase().replace(ext.toUpperCase(), "") + "_print.pdf";
			list.add(printFileName + "");
			//生成电子水印
			addWaterMark(fileName, wmFileId);
			//生成打印水印
			addPrintWaterMark(fileName, printFileName, 0);
		} catch (Exception e) {
			SysUtils.deleteDir(new File(fileName));
			SysUtils.deleteDir(new File(printFileName));
			throw new Exception(e.getMessage());
		}

		return list;
	}

	// 添加电子水印
	private static void addWaterMark(String fileName, String fileId) throws Exception {
		GTwatermark gt = new GTwatermark();
		if (gt.GTisWatermarked(fileName))
			throw new Exception("当前文件已经添加电子水印");
		int ret = gt.GTaddWatermark(fileName, fileId);
		if (ret != 0)
			throw new Exception("添加电子水印失败:" + ret);
	}

	public static Object getFieldValueByName(String fieldName, Object o) throws SecurityException, NoSuchFieldException, IllegalArgumentException,
			IllegalAccessException {
		Field fld = o.getClass().getDeclaredField(fieldName);
		fld.setAccessible(true);
		return fld.get(o);
	}

	//添加打印水印
	private static void addPrintWaterMark(String fileName, String printFileName, Integer pringKind) throws Exception {
		GTwatermark gt = new GTwatermark();
		if (!gt.GTisWatermarked(fileName))
			throw new Exception("当前文件未添加电子水印");
		//0代表黑白打印  1是彩色打印
		int ret = gt.GTprintWatermark(fileName, printFileName, pringKind);
		if (ret != 0)
			throw new Exception("添加电子水印失败:" + ret);
	}

	public static ActionResult executeAction(String action, Map<String, Object> params, String bsessionid) {
		Action localAction = new Action();
		localAction.setProcess("/common/simpleDoc/process/simpleDoc/simpleDocProcess");
		localAction.setActivity("mainActivity");
		localAction.setName(action);
		Iterator<String> iter = params.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			localAction.setParameter(key, params.get(key));
		}
		return ActionEngine.invokeAction(localAction, com.justep.biz.client.ActionUtils.JSON_CONTENT_TYPE, bsessionid, "zh_CN", null);

	}

	public static void main(String[] args) throws Exception {
		System.out.println(System.getProperty("java.library.path"));
		System.out.println(System.getProperty("java.version"));
		addWaterMark("c:\\test.docx", "123");
	}
}
