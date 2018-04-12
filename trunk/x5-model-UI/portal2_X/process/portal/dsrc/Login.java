import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.butone.portal.LoignWM;

public class Login extends LoignWM {
	@Override
	public void execute(Map<String, Object> vars, HttpServletRequest request, HttpServletResponse response) {
		super.execute(vars, request, response);
		JSONObject config = new JSONObject();
		vars.put("config", config.toString().replaceAll("(?!&amp;)&", "&amp;"));
	}
}
