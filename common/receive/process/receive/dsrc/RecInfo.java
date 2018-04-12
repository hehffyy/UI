import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.util.NetUtils;

public class RecInfo extends com.justep.ui.impl.JProcessorImpl {

	public static final String PROCESS = "/SA/receive/process/receive/receiveProcess";
	public static final String ACTIVITY = "mainActivity";
	private static final String QUERY_RECINFO_ACTION = "getRecInfo";//获取收件信息
	private static final String QUERY_RECTITLE_ACTION = "getRecTitle";//获取收件标题信息
	private static final String GET_IMAGEURL_ACTION = "getImageUrl";//获取图片信息

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 编码
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// widget标题信息
		JSONObject objT = queryReceiveTitle(request);
		JSONObject dataT = objT.getJSONObject("data");
		JSONObject valueT = dataT.getJSONObject("value");
		JSONArray arrayT = valueT.getJSONArray("rows");
		JSONObject rowsT = null;

		PrintWriter pw = response.getWriter();
		pw.println("<html>");
		pw.println("<head>");
		pw.println("<link rel='stylesheet' type='text/css' href='/x5/UI/SA/receive/process/receive/recInfo.css'>");
		pw.println("<script type='text/javascript' src='/x5/base/base.js' ></script>");
		pw.println("<script type='text/javascript' src='/x5/form/form.js' ></script>");
		pw.println("<script type='text/javascript' src='/x5/UI/SA/receive/process/receive/recInfo.js'></script>");
		pw.println("</head>");
		pw.println("<body>");

		//最外层DIV
		pw.println("<div id='id-9' style='border:1px solid #1BA0E1;position:absolute;left:300px;top:20px;width:600px;'>");
		// widget标题
		for (int j = 0; j < arrayT.size(); j++) {
			rowsT = arrayT.getJSONObject(j);
			JSONObject catalogTitle = rowsT.getJSONObject("FCATALOGNAME");
			String title = (String) catalogTitle.get("value");
			//边框
			pw.println("<div id='id_" + j + "' class='portalpageview' style='border:3px solid #6599FF;'>");
			//head
			pw.println("<div class='widget-head' ondblclick=\"collapse('id_" + j + "')\" style='background:#6599FF;'>");
			pw.println("<a class='collapse' href='#' onclick=\"collapse('id_" + j + "')\">COLLAPSE</a>");// TODO DIVID
			pw.println("<h3>" + title + "</h3>");
			pw.println("<span class='right'>");
			//pw.println("<a style='float:right;padding:0px 5px;' href='javascript:void(0)' onclick='openAll()'>[展开所有]</a>");
			pw.println("</span>");
			pw.println("</div>");
			//head

			// widget内容(收件信息)
			JSONObject obj = queryReceive(request, title);
			JSONObject data = obj.getJSONObject("data");
			JSONObject value = data.getJSONObject("value");
			JSONArray array = value.getJSONArray("rows");
			JSONObject rows = null;

			// 模块内容
			pw.println("<div class='widget-content'>");
			for (int i = 0; i < array.size(); i++) {
				rows = array.getJSONObject(i);
				JSONObject fNameObj = rows.getJSONObject("FNAME");
				JSONObject fUrlObj = rows.getJSONObject("FURL");
				JSONObject fprocessObj = rows.getJSONObject("FPROCESS");
				JSONObject factivityObj = rows.getJSONObject("FACTIVITY");
				JSONObject pictureObj = rows.getJSONObject("FPICTURE");

				String fName = (String) fNameObj.get("value");
				String fUrl = (String) fUrlObj.get("value");
				String fprocess = (String) fprocessObj.get("value");
				String factivity = (String) factivityObj.get("value");

				String picture = (String) pictureObj.get("value");
				JSONArray jsonArray = JSONArray.parseArray(picture);
				JSONObject objPic = jsonArray.getJSONObject(0);
				String docPath = objPic.getString("docPath");
				String fileID = objPic.getString("fileID");

				JSONObject objImg = getImageUrl(request, docPath, fileID);
				JSONObject dataImg = objImg.getJSONObject("data");
				String imgUrl = dataImg.getString("value");

				pw.println("<ol class='dd-list'>");
				pw.println("<li>");
				//图标
				pw.println("<img name='flagImg' class='dd-handle dd3-handle' src='" + imgUrl + "'></img>");
				//功能标题	
				pw.print("<div class='dd3-content' onclick=\"openTask(\'");
				pw.print(fprocess);
				pw.print("\',\'");
				pw.print(factivity);
				pw.print("\',\'");
				pw.print(fName);
				pw.print("\',\'");
				pw.print(fUrl);
				pw.println("\')\">");
				pw.print("<a href='javascript:void(0)'>");
				pw.println(fName);
				pw.println("</a>");
				pw.println("</div>");

				pw.println("<li>");
				pw.println("</ol>");
			}
			pw.println("</div>"); //内容			
			pw.println("</div>");//边框
		}
		pw.println("</div>");//最外层DIV
		pw.println("</body>");
		pw.println("</html>");

	}

	/**
	 * 收件信息
	 * @param request
	 * @return
	 */
	private JSONObject queryReceive(HttpServletRequest request, String title) {

		Action action = new Action();
		action.setParameter("title", title);
		action.setProcess(PROCESS);
		action.setActivity(ACTIVITY);
		action.setName(QUERY_RECINFO_ACTION);
		action.setExecutor(NetUtils.getExecutor(request));
		action.setExecuteContext(NetUtils.getExecuteContext(request));
		String bsessionID = NetUtils.getBSessionID(request);
		String language = NetUtils.getLanguage(request);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
		return (JSONObject) ar.getContent();
	}

	/**
	 * 标题信息
	 * @param request
	 * @return
	 */
	private JSONObject queryReceiveTitle(HttpServletRequest request) {

		Action action = new Action();
		action.setProcess(PROCESS);
		action.setActivity(ACTIVITY);
		action.setName(QUERY_RECTITLE_ACTION);
		action.setExecutor(NetUtils.getExecutor(request));
		action.setExecuteContext(NetUtils.getExecuteContext(request));
		String bsessionID = NetUtils.getBSessionID(request);
		String language = NetUtils.getLanguage(request);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
		return (JSONObject) ar.getContent();
	}

	/**
	 * 图片信息
	 * @param request
	 * @return
	 */
	private JSONObject getImageUrl(HttpServletRequest request, String docPath, String fileID) {

		Action action = new Action();
		action.setParameter("docPath", docPath);
		action.setParameter("fileID", fileID);
		action.setProcess(PROCESS);
		action.setActivity(ACTIVITY);
		action.setName(GET_IMAGEURL_ACTION);
		action.setExecutor(NetUtils.getExecutor(request));
		action.setExecuteContext(NetUtils.getExecuteContext(request));
		String bsessionID = NetUtils.getBSessionID(request);
		String language = NetUtils.getLanguage(request);
		ActionResult ar = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
		return (JSONObject) ar.getContent();
	}
}
