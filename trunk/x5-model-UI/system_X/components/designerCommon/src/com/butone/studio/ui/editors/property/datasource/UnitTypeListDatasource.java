package com.butone.studio.ui.editors.property.datasource;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.butone.studio.ui.utils.XUIUtils;
import com.justep.filesystem.FileSystem;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.StudioConfig;

public class UnitTypeListDatasource {

	private static String driver;
	private static String url;
	private static String dbUser;
	private static String dbPassword;

	/**
	 * 获取单位类别
	 * @param propertyItem
	 * @return
	 */
	public static List<String[]> getTypeDatasource(PropertyItem propertyItem) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		List<String[]> list = new ArrayList<String[]>();
		String sql = "select distinct funittype from B_UnitType";
		getParam();
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, dbUser, dbPassword);
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				list.add(new String[] { rs.getString("funittype"), rs.getString("funittype") });
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (rs != null)
				try {
					rs.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
			if (stmt != null)
				try {
					stmt.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
			if (conn != null)
				try {
					conn.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
		}
		return list;
	}

	/**
	 * 获取显示单位列表
	 * @param propertyItem
	 * @return
	 */
	public static List<String[]> getDispDatasource(PropertyItem propertyItem) {
		String parameter = propertyItem.getEditorParameter();
		String type = propertyItem.getOwerElement().getProperyValue(parameter);
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		List<String[]> list = new ArrayList<String[]>();
		getParam();

		String sql = "select funitname from B_UnitType where funittype='" + type + "'";
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, dbUser, dbPassword);
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				list.add(new String[] { rs.getString("funitname"), rs.getString("funitname") });
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (rs != null)
				try {
					rs.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
			if (stmt != null)
				try {
					stmt.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
			if (conn != null)
				try {
					conn.close();
				} catch (Exception e) {
					XUIUtils.consoleViewStackTrace(e);
				}
		}
		return list;
	}

	public static Map<String, String> getUnitTypeInfo(String unitType) {
		String unitNames = "";
		String unitRates = "";
		getParam();
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "select funitname,frate from B_UnitType where funittype='" + unitType + "'";
		try {
			// TODO 连接配置到XML中
			Class.forName(driver);
			conn = DriverManager.getConnection(url, dbUser, dbPassword);
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				unitNames += "," + rs.getString("funitname");
				unitRates += "|" + rs.getString("frate");
			}
			Map<String, String> ret = new HashMap<String, String>();
			ret.put("unitNames", unitNames.substring(1));
			ret.put("unitRates", unitRates.substring(1));
			return ret;
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (rs != null)
				try {
					rs.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			if (stmt != null)
				try {
					stmt.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			if (conn != null)
				try {
					conn.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
		}
	}

	/**
	 * 读入db_oracle.properties,获取数据
	 * 
	 */
	private static void getParam() {
		FileSystem fs = FileSystemWrapper.instance();
        String filename = fs.getRealPath("/UI/system_X/bizModelDB.properties"); 
//		String filename = StudioConfig.getUIPath() + "/system_X/bizModelDB.properties";
		File file = new File(filename);
		try {
			FileInputStream fis = new FileInputStream(file);
			// Map接口的子类Properties,键值对对象
			Properties props = new Properties();
			// fis中的键值对信息装载到props对象中
			props.load(fis);
			// 从键值对对象props中通过key找到value
			driver = props.getProperty("driver");
			url = props.getProperty("url");
			dbUser = props.getProperty("dbUser");
			dbPassword = props.getProperty("dbPassword");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}