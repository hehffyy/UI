import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.butone.knockout.DataBindUtils;
import com.justep.system.transform.Utils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class BuildingView implements JavaTemplate {
	private static String koComponent="$model/UI/bdcSys/components/knockout/buildingView";

	public Element execute(Element bound, @SuppressWarnings("rawtypes") Map context) throws XBLException {
		DataBindUtils.parseDataConfig(bound, koComponent, true);
		bound.remove(bound.attribute("component"));
		return bound.createCopy();
	}

}