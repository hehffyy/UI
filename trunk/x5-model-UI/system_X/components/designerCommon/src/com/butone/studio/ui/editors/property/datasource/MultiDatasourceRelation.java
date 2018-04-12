package com.butone.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.butone.studio.ui.utils.XUIUtils;
import com.justep.design.model.Model;
import com.justep.design.model.ModelConstant;
import com.justep.design.model.ModelParser;
import com.justep.design.model.element.Concept;
import com.justep.design.model.element.HasRelation;
import com.justep.design.model.kql.QConcept;
import com.justep.design.model.kql.QRelation;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.StudioConfig;

/**
 * 多数据源关系
 * @author hancf
 *
 */
public class MultiDatasourceRelation {

	public static final String MODEL_EXT_URI = "http://www.butone.com";
	private static String EXT_HASRELATION_UNITTYPE = "unitType";

	/**
	 * 获得多源数据的关系
	 */
	public DataSet getDatasource(PropertyItem propertyItem) {

		List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByBaseClass("data");
		DataSet ret = XuiDataSourceManager.createHasRelationDataSet();
		String idsPropName = propertyItem.getEditorParameter();
		List<String> dataIds = null;
		if (idsPropName != null) {
			dataIds = new ArrayList<String>();
			String ids = propertyItem.getOwerElement().getProperyValue(idsPropName);
			if (ids != null && !ids.equals("")) {
				dataIds.addAll(Arrays.asList(ids.split(",")));
			}
		}

		for (XuiElement dataE : list) {
			if (dataIds != null && dataIds.indexOf(dataE.getId()) == -1)
				continue;
			if ("dataQ".equals(dataE.getName()) || "data".equals(dataE.getName())) {
				String columns = dataE.getProperyValue("columns");
				String[] columnItems = columns.split(",");
				for (String col : columnItems) {
					// "selected\alias\name\id"
					ret.addRecord(new Object[] { false, dataE.getId() + "." + col, col, col, "String", null, "relation" });
				}
			} else {
				String[] actinoInfo = XUIUtils.getActionInfoOfData(dataE, XuiConstant.P_READER);
				DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(actinoInfo[0], actinoInfo[1], true);
				formatAlias(ds);
				for (DataRecord dr : ds.getData())
					ret.addRecord(dr);
			}

		}
		//已选保护字段【oldRelations】
		String oldRelations = propertyItem.getValue();
		String[] relstions = oldRelations.split(",");
		List<String> includeList = new ArrayList<String>();
		for (String relation : relstions) {
			//选过的关系集合【includeList】
			includeList.add(relation);
		}
		ret.setValueByCondition(DSUtil.SELECTED, true, ModelConstant.ALIAS, includeList);
		return ret;
	}

	/**
	 * 获得多源数据的关系
	 */
	public DataSet getUnitFieldRelations(PropertyItem propertyItem) {
		String thisId = propertyItem.getOwerElement().getOriginElement().getAttribute("id");

		String unitType = propertyItem.getEditorExtendEata();
		DataSet ret = XuiDataSourceManager.createHasRelationDataSet();
		if (unitType == null || unitType.trim().equals("")) {
			ConsoleView.println("单位控制字段[" + thisId + "]的扩展数据需配置为[单位类型]的属性名");
			return ret;
		}
		unitType = propertyItem.getOwerElement().getProperyValue(unitType);
		if (unitType == null || unitType.trim().equals("")) {
			ConsoleView.println("单位控制字段[" + thisId + "]未设置单位类型");
			return ret;
		}

		List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByBaseClass("data");

		String idsPropName = propertyItem.getEditorParameter();
		List<String> dataIds = null;
		if (idsPropName != null) {
			dataIds = new ArrayList<String>();
			String ids = propertyItem.getOwerElement().getProperyValue(idsPropName);
			if (ids != null && !ids.equals("")) {
				dataIds.addAll(Arrays.asList(ids.split(",")));
			}
		}

		XuiDataModel dataModel = ((XuiElement) propertyItem.getOwerElement()).getXuiDataModel();
		String modelName = dataModel.getModuleName();
		Model model = ModelParser.parseModel(StudioConfig.getBizPath(), modelName);

		for (XuiElement dataE : list) {
			if (dataIds != null && dataIds.indexOf(dataE.getId()) == -1)
				continue;
			if (!"bizData".equals(dataE.getName()))
				continue;
			String conceptName = dataE.getProperyValue("concept");
			//概念
			Concept concept = model.findConcept(conceptName);
			if (concept == null)
				continue;

			//通过关系扩展属性得到单位类型
			String[] actinoInfo = XUIUtils.getActionInfoOfData(dataE, XuiConstant.P_READER);
			DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(actinoInfo[0], actinoInfo[1], true);
			for (DataRecord dr : ds.getData()) {
				QRelation qRelation = (QRelation) dr.getValue("owner");
				if (qRelation == null) {
					continue;
				}
				ConsoleView.println("check relation " + qRelation.getName() + " is " + unitType);
				HasRelation hasRelation = concept.getHasRelation(qRelation.getName());
				if (hasRelation == null)
					continue;

				if (unitType.equals(hasRelation.getExtValue(MODEL_EXT_URI, EXT_HASRELATION_UNITTYPE)))
					ret.addRecord(dr);
			}

		}
		//已选保护字段【oldRelations】
		String oldRelations = propertyItem.getValue();
		String[] relstions = oldRelations.split(",");
		List<String> includeList = new ArrayList<String>();
		for (String relation : relstions) {
			//选过的关系集合【includeList】
			includeList.add(relation);
		}
		ret.setValueByCondition(DSUtil.SELECTED, true, ModelConstant.ALIAS, includeList);
		formatAlias(ret);
		return ret;
	}

	/**
	 * 设置数据格式【概念名.关系名】
	 * @param ds
	 */
	private static void formatAlias(DataSet ds) {
		for (DataRecord r : ds.getData()) {
			formatAlias(r);
		}
	}

	private static void formatAlias(DataRecord dr) {
		//获取概念名[conceptName]
		QRelation qRelation = (QRelation) dr.getValue("owner");
		if (qRelation == null) {
			return;
		}
		QConcept qConcept = qRelation.getQConcept();
		if (qRelation.getName().equals(qConcept.getName()))
			return;
		String conceptName = qConcept.getName();
		//组装别名
		String field = conceptName + "." + dr.getString("alias");
		dr.setValue("alias", field);

	}
}
