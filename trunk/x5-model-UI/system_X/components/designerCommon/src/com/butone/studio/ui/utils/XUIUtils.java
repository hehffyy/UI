package com.butone.studio.ui.utils;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Element;

import com.justep.design.model.ModelParser;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.ExtSpaceUIUtil;
import com.justep.studio.util.LogUtil;

public class XUIUtils {

	/**
	 * 获得所有数据源ID
	 * @param propertyItem
	 * @return
	 */
	public static List<String[]> getAllDataSourceIds(PropertyItem propertyItem) {
		List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByBaseClass("data");
		List<String[]> idList = new ArrayList<String[]>();
		for (XuiElement e : list) {
			idList.add(new String[] { e.getId(), e.getId() });
		}
		return idList;
	}

	/**
	 * 从data元素节点获取Action信息
	 * @param bizDataE
	 * @param propName
	 * @return
	 */
	public static String[] getActionInfoOfData(XuiElement bizDataE, String propName) {
		String[] actionInfo = new String[2];
		//try{
		if (!"data".equals(bizDataE.getConfigAttribute("base-class")) && !"dataQ".equals(bizDataE.getConfigAttribute("base-class"))) {
			bizDataE = bizDataE.getParentElement();
		}

		String action = bizDataE.getProperyValue(XuiConstant.P_READER);
		if (action == null) {
			LogUtil.warn("没有设置reader action。");
			return new String[] { "", "" };
		}
		int idx = action.lastIndexOf("/");
		if (idx != -1) {
			actionInfo[0] = action.substring(0, idx);
			if (ExtSpaceUIUtil.isInExtSpace(bizDataE.getXuiDataModel().getFilePath())) {
				actionInfo[0] = ModelParser.getExtFileName(actionInfo[0]);
				LogUtil.debug("存在扩展空间，从扩展空间获取模块名称：" + actionInfo[0] + "  原始模块名称：" + action.substring(0, idx));
			}
			actionInfo[1] = action.substring(idx + 1);
			LogUtil.debug("action名称：" + actionInfo[1]);
		}
		//}catch(Exception ex){
		//LogUtil.error("获取bizdata中的action信息出错。", ex);
		//}
		return actionInfo;
	}

	/**
	 * 获取组件宽度
	 * @param bound
	 * @param id
	 * @return
	 */
	public static int getWidth(Element bound, String id) {

		Element el = (Element) bound.getDocument().selectSingleNode("//xui:place[@control='" + id + "']");
		String style = el.attributeValue("style");
		String[] attributes = style.split(";");
		int width = 0;
		for (int i = 0; i < attributes.length; i++) {
			if (attributes[i].startsWith("width")) {
				String widths = attributes[i];
				String str = widths.split(":")[1];
				width = Integer.parseInt(str.substring(0, str.length() - 2));
			}
		}
		return width;
	}

	/**
	 * 获取组件高度
	 * @param bound
	 * @param id
	 * @return
	 */
	public static int getHeight(Element bound, String id) {

		Element el = (Element) bound.getDocument().selectSingleNode("//xui:place[@control='" + id + "']");
		String style = el.attributeValue("style");
		String[] attributes = style.split(";");
		int height = 0;
		for (int i = 0; i < attributes.length; i++) {
			if (attributes[i].startsWith("height")) {
				String heights = attributes[i];
				String str = heights.split(":")[1];
				height = Integer.parseInt(str.substring(0, str.length() - 2));
			}
		}
		return height;
	}

	public static void consoleViewStackTrace(Exception e) {
		e.printStackTrace(new PrintWriter(ConsoleView.getConsoleStream()));
	}

}
