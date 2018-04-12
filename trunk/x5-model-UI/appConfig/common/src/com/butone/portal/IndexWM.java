package com.butone.portal;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.Action;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.WModel;
import com.justep.ui.system.service.permission.QueryProcessPermission;
import com.justep.ui.util.NetUtils;

public class IndexWM implements WModel {
	private String bsessionID;
	private String executor;
	private String appName;
	private QueryProcessPermission permission;
	protected String portal = "portal2";

	public void execute(Map<String, Object> vars, HttpServletRequest request, HttpServletResponse response) {

		//获取用户信息
		this.bsessionID = request.getParameter("bsessionid");
		this.appName = request.getParameter("appName");
		Document personInfo = (Document) vars.get("_params");
		//如果没有登陆重定向到login.w 
		try {
			String msg = personInfo.selectSingleNode("root/code").getStringValue();
			if (msg.equals("JUSTEP150000")) {
				String href = request.getContextPath() + "/" + portal + "/process/portal/login.w";
				if (this.appName != null)
					href += "?appName" + this.appName;
				String client = request.getParameter("client");
				if (client != null)
					href += (href.contains("?") ? "&" : "?") + "client=" + client;
				response.sendRedirect(href);
				vars.put("redirect", true);
				return;
			}
		} catch (Exception e) {
		}

		//默认
		this.executor = personInfo.selectSingleNode("form/bizParams/currentPersonID").getStringValue();

		//指定执行者
		String personId = NetUtils.getExecutor(request);
		if (personId != null && personId.length() > 0) {
			this.executor = personId;
		}

		//代理
		String agentId = request.getParameter("agent");
		if (agentId != null && agentId.length() > 0) {
			this.executor = agentId;
		}
		permission = new QueryProcessPermission();
		permission.execute(executor, NetUtils.getExecuteContext(request), NetUtils.getBSessionID(request), NetUtils.getLanguage(request));

		JSONObject config = new JSONObject();

		config.put("bsessionid", bsessionID);
		if (permission.isSuccess()) {
			config.put("functree", getFunctree(request));
			config.put("widgets", getWidgets(request));
		} else {
			config.put("functree", permission.getError());
			config.put("widgets", permission.getError());
		}
		config.put("customized", getLayout(request));

		//如果获取到被代理人ID就再获取被代理人信息，否则尝试获取被代理人列表
		if (agentId != null && agentId.length() > 0) {
			config.put("agentInfo", getAgentInfo(request));
		} else {
			config.put("agents", getAgentList(request));
		}

		config.put("isDebug", "true".equalsIgnoreCase(System.getProperty("debug")) ? "true" : "false");
		if (appName != null)
			config.put("appName", appName);
		vars.put("config", config.toString().replaceAll("(?!&amp;)&", "&amp;"));
		AppConfigUtils.loadAppConfig(appName, vars);
	}

	private JSONArray getAgentList(HttpServletRequest request) {
		String language = request.getParameter("language");

		Action action = new Action();
		action.setProcess("/SA/OPM/system/systemProcess");
		action.setActivity("mainActivity");
		action.setName("getAgentListAction");
		action.setParameter("type", ActionUtils.JSON_CONTENT_TYPE);
		ActionResult result = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);

		JSONObject temp = (JSONObject) result.getContent();

		temp = (JSONObject) temp.get("data");

		return (JSONArray) temp.get("value");
	}

	private JSONObject getAgentInfo(HttpServletRequest request) {
		String agentId = request.getParameter("agent");
		String language = request.getParameter("language");

		Action action = new Action();
		action.setProcess("/SA/OPM/system/systemProcess");
		action.setActivity("mainActivity");
		action.setName("getSysParamsAction");
		//action.setParameter("type", ActionUtils.JSON_CONTENT_TYPE);
		action.setExecutor(agentId);
		ActionResult result = ActionEngine.invokeAction(action, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);

		JSONObject temp = (JSONObject) result.getContent();

		temp = (JSONObject) temp.get("data");
		temp = (JSONObject) temp.get("value");

		return temp;
	}

	private JSONObject getFunctree(HttpServletRequest request) {

		Element root = FunctionTree.execute(this.permission.getPermissions(), this.appName, this.executor, NetUtils.getExecuteContext(request),
				NetUtils.getBSessionID(request), NetUtils.getLanguage(request));
		if (root != null) {
			return this.getJSONObject(root);
		} else {
			return new JSONObject();
		}

	}

	@SuppressWarnings("unchecked")
	private JSONObject getJSONObject(Element ele) {
		JSONObject result = new JSONObject();
		result.put("nodeName", ele.getName());

		List<Attribute> attrs = ele.attributes();
		int atsz = attrs.size();
		if (atsz > 0) {
			for (int i = 0; i < atsz; i++) {
				Attribute attr = (Attribute) attrs.get(i);
				result.put(attr.getName(), attr.getValue());
			}
		}
		JSONArray children = new JSONArray();

		List<Element> eles = ele.elements();
		if (!eles.isEmpty()) {
			int elesz = eles.size();
			for (int i = 0; i < elesz; i++) {
				Element e = (Element) eles.get(i);
				children.add(this.getJSONObject(e));
			}
		}

		result.put("childNodes", children);
		return result;
	}

	private JSONObject getWidgets(HttpServletRequest request) {
		Document resultDoc = WidgetList.execute(this.permission.getPermissions(), this.appName, this.executor, NetUtils.getExecuteContext(request),
				NetUtils.getBSessionID(request), NetUtils.getLanguage(request));

		if (resultDoc != null) {
			Element root = resultDoc.getRootElement();
			JSONObject result = this.getWidgetsData(root);
			return result;
		} else {
			return new JSONObject();
		}
	}

	private JSONObject getWidgetsData(Element root) {

		int typeIndex = 0;
		JSONObject result = new JSONObject();

		List<Element> typelist = root.elements();
		for (int n = 0; n < typelist.size(); n++) {

			Element te = (Element) typelist.get(n);
			typeIndex++;
			JSONObject widgetType = new JSONObject();
			result.put("widgetType" + typeIndex, widgetType);
			widgetType.put("category", te.attributeValue("label"));
			JSONArray widgets = new JSONArray();
			widgetType.put("widgets", widgets);
			List<Element> widgetList = te.elements();
			for (int j = 0; j < widgetList.size(); j++) {
				Element widgetElement = (Element) widgetList.get(j);
				JSONObject widget = new JSONObject();
				widgets.add(widget);
				String type = widgetElement.attribute("type").getValue();
				if (type.equals("func")) {
					List<Attribute> attrs = widgetElement.attributes();
					for (int k = 0; k < attrs.size(); k++) {
						Attribute attr = (Attribute) attrs.get(k);
						widget.put(attr.getName(), attr.getValue());
					}
				} else if (type.equals("link")) {
					List<Attribute> attrs = widgetElement.attributes();
					for (int k = 0; k < attrs.size(); k++) {
						Attribute attr = (Attribute) attrs.get(k);
						widget.put(attr.getName(), attr.getValue());
					}
				}
				/*
								else if(type.equals("part")){
									if(widgetElement.attribute("process")!=null){	
										widgetElement.remove(widgetElement.attribute("process"));
									}
									if(widgetElement.attribute("activity")!=null){
										widgetElement.remove(widgetElement.attribute("activity"));
									}
									if(widgetElement.attribute("params")!=null){						
										widgetElement.remove(widgetElement.attribute("params"));
									}
								}
				*/
				if (widgetElement.elements("more").size() > 0) {
					Element me = widgetElement.element("more");
					JSONObject more = new JSONObject();
					widget.put("more", more);
					List<Attribute> mattrs = me.attributes();
					for (int k = 0; k < mattrs.size(); k++) {
						Attribute mattr = (Attribute) mattrs.get(k);
						more.put(mattr.getName(), mattr.getValue());
					}
				}
			}
		}
		return result;
	}

	private JSONObject getLayout(HttpServletRequest request) {
		String language = request.getParameter("language");
		Action layoutAction = new Action();
		layoutAction.setProcess("/portal2/process/portal/portalProcess");
		layoutAction.setActivity("index");
		layoutAction.setName("selectPortal2ProfilesAction");
		layoutAction.setParameter("personID", this.executor);
		ActionResult result = ActionEngine.invokeAction(layoutAction, ActionUtils.JSON_CONTENT_TYPE, bsessionID, language, null);

		JSONObject temp = (JSONObject) result.getContent();
		temp = (JSONObject) temp.get("data");
		temp = (JSONObject) temp.get("value");

		String[] relations = new String[] { "sFunctree", "sPortal", "sOther" };
		for (String rel : relations) {
			Object s = temp.get(rel);
			if (s == null || (s instanceof String && ((String) s).equals("")))
				s = "{}";
			temp.remove(rel);
			temp.put(rel.substring(1).toLowerCase(), JSON.parse((String) s));
		}

		return temp;
	}

}
