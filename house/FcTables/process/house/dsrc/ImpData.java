import java.io.IOException;
import java.io.OutputStream;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;

public class ImpData extends com.justep.ui.impl.JProcessorImpl {
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("action");
		String language = request.getParameter("language");
		String bsessionID = request.getParameter("bsessionid");
		ActionResult checkResult = ActionEngine.checkSession(bsessionID, ActionUtils.JSON_CONTENT_TYPE);
		if (checkResult.isSessionTimeOut()) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String ip = request.getRemoteAddr();
			Date loginDate = new Date(System.currentTimeMillis());
			ActionResult actionResult = ActionEngine.login2(username, password, ip, language, loginDate, null, ActionUtils.JSON_CONTENT_TYPE, null);
			bsessionID = actionResult.getBSessionID();
		}

		if ("importAllHouseAction".equals(name)) {
			importAllHouse(request, bsessionID, language);
		} else if ("importTradeQSDataAction".equals(name)) {
			importTradeQSData(request, bsessionID, language);
		} else if ("importBuildAction".equals(name)) {
			importBuild(request, bsessionID, language);
		} else if ("importHouseRegDataAction".equals(name)) {
			importHouseRegData(request, bsessionID, language);
		} else if ("impHXTImageAction".equals(name)) {
			impHXTImageAction(request, bsessionID, language);
		} else {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write("{\"msg\":\"任务已提交\"}".getBytes("utf-8"));
		output.flush();
		output.close();
	}

	private void importAllHouse(HttpServletRequest request, final String bsessionID, final String language) {
		final Action action = new Action();
		action.setProcess("/house/FcTables/process/house/houseProcess");
		action.setActivity("impFangChan");
		action.setName("importAllHouseAction");
		action.setParameter("xzq", request.getParameter("xzq"));
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

	private void importBuild(HttpServletRequest request, final String bsessionID, final String language) {
		final Action action = new Action();
		action.setProcess("/house/FcTables/process/house/houseProcess");
		action.setActivity("impFangChan");
		action.setName("importBuildAction");
		action.setParameter("xzq", request.getParameter("xzq"));
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

	private void importTradeQSData(HttpServletRequest request, final String bsessionID, final String language) {
		final Action action = new Action();
		action.setProcess("/house/FcTables/process/house/houseProcess");
		action.setActivity("impFangChan");
		action.setName("importTradeQSDataAction");
		action.setParameter("xzq", request.getParameter("xzq"));
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

	private void importHouseRegData(HttpServletRequest request, final String bsessionID, final String language) {
		final Action action = new Action();
		action.setProcess("/house/FcTables/process/house/houseProcess");
		action.setActivity("impFangChan");
		action.setName("importHouseRegDataAction");
		action.setParameter("xzq", request.getParameter("xzq"));
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

	private void impHXTImageAction(HttpServletRequest request, final String bsessionID, final String language) {
		final Action action = new Action();
		action.setProcess("/house/FcTables/process/house/houseProcess");
		action.setActivity("impFangChan");
		action.setName("impHXTImageAction");
		action.setParameter("xzq", request.getParameter("xzq"));
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}

}
