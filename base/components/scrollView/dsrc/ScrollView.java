import java.util.Map;

import org.dom4j.Element;

import com.butone.knockout.DataBindUtils;
import com.justep.xbl.JavaTemplate;
import com.justep.xbl.runtime.XBLException;

public class ScrollView implements JavaTemplate {

	@Override
	public Element execute(Element bound, Map context) throws XBLException {
		DataBindUtils.parseDataConfig(bound, null, true);
		bound.remove(bound.attribute("component"));
		return bound.createCopy();
	}
}