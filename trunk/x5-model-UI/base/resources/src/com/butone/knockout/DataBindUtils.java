package com.butone.knockout;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Iterator;

import org.dom4j.Attribute;
import org.dom4j.Element;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.SimpleTransform;
import com.justep.system.transform.Utils;

public class DataBindUtils {

	public static void parseDataConfig(Element ele, String koComponent, boolean removeAttr) {
		if (koComponent == null && ele.attributeValue("component") == null) {
			return;
		}
		String path = null;
		if (koComponent != null) {
			path = koComponent.substring(6) + ".config.js";
		} else {
			koComponent = xblComponent2koComponent(ele.attributeValue("component"));
			String[] args = ele.attributeValue("component").split("#");
			path = args[0].substring(0, args[0].lastIndexOf("/")) + "/knockout/" + args[1] + ".config.js";
		}
		path = FileSystemWrapper.instance().getRealPath(path);
		File file = new File(path);
		if (file.exists()) {
			try {
				JSONObject config = JSON.parseObject(readDataConfig(file));
				JSONObject properties = config.getJSONObject("properties");
				Object[] keys = properties.keySet().toArray();
				for (Object key : keys) {
					Attribute attr = ele.attribute(key.toString());
					if (attr == null) {
						properties.remove(key.toString());
					} else {
						properties.put(key.toString(), SimpleTransform.transToObj(properties.getString(key.toString()), attr.getValue()));
						if (removeAttr)
							ele.remove(attr);
					}
				}

				ele.addAttribute("data-config", htmlEncode(properties.toString()));

				JSONArray events = config.getJSONArray("events");
				StringBuffer sb = new StringBuffer();
				for (int n = 0; n > events.size(); n++) {
					String event = events.getString(n);
					Attribute attr = ele.attribute(event);
					if (attr != null) {
						sb.append(event).append(":").append(attr.getValue()).append(";");
						if (removeAttr)
							ele.remove(attr);
					}
				}

				if (sb.length() > 0)
					ele.addAttribute("data-events", htmlEncode(sb.substring(0, sb.length() - 1)));
				StringBuffer dataBind = new StringBuffer();
				dataBind.append("component:{name:'" + koComponent + "'");
				if (config.containsKey("binds")) {
					JSONObject binds = config.getJSONObject("binds");
					Iterator<String> i = binds.keySet().iterator();
					while (i.hasNext()) {
						String key = i.next();
						Attribute attr = ele.attribute(key);
						if (attr != null) {
							dataBind.append(",").append(binds.getString(key)).append(":").append(attr.getValue());
							if (removeAttr)
								ele.remove(attr);
						}
					}
					String htmlDataBind = ele.attributeValue("data-bind");
					if (Utils.isNotEmptyString(htmlDataBind)) {
						dataBind.append("," + htmlDataBind);
					}
				}
				dataBind.append("}");
				ele.addAttribute("data-bind", htmlEncode(dataBind.toString()));
				Attribute attr = ele.attribute("require");
				if (attr != null)
					ele.remove(attr);

				Element require = ele.addElement("require");
				require.addAttribute("url", koComponent.substring(10));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	private static String htmlEncode(String str) {
		str = str.replace("&", "&amp;");
		str = str.replace("<", "&lt;");
		str = str.replace(">", "&gt;");
		//		str = str.replace("\"", "\\\\\"");
		return str;
	}

	public static String xblComponent2koComponent(String xblComponent) {
		String[] args = xblComponent.split("#");
		return "$model" + args[0].substring(0, args[0].lastIndexOf("/")) + "/knockout/" + args[1];
	}

	private static String readDataConfig(File file) {
		FileInputStream in = null;
		StringBuffer sb = new StringBuffer();
		try {
			in = new FileInputStream(file);
			BufferedReader dr = new BufferedReader(new InputStreamReader(in));
			String line = null;
			while ((line = dr.readLine()) != null) {
				sb.append(line.trim());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {

				}
			}
		}
		String ret = sb.toString();
		ret = ret.substring(ret.indexOf("return") + 7);
		ret = ret.substring(0, ret.lastIndexOf("}"));
		ret = ret.substring(0, ret.lastIndexOf("}") + 1);
		return ret;

	}
}
