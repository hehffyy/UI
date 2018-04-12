import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.butone.portal.CaptchaUtil;

public class ValidateCode extends com.justep.ui.impl.JProcessorImpl {
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CaptchaUtil util = CaptchaUtil.getRandomInstance();

		response.setHeader("Expires", "-1");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Pragma", "-1");

		// 将验证码输入到session中，用来验证  
		request.getSession().setAttribute("$validateCode", util.getCode());
		// 120秒超时
		request.getSession().setAttribute("$validateCodeExpireTime", System.currentTimeMillis() + 2 * 60 * 1000);

		// 输出打web页面  
		ImageIO.write(util.getImage(), "jpg", response.getOutputStream());
	}
}
