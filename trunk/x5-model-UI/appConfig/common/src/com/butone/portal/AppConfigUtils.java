package com.butone.portal;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.xml.transform.TransformerFactoryConfigurationError;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;

import com.justep.filesystem.FileSystemWrapper;
import com.justep.system.transform.Utils;
import com.justep.ui.exception.UIException;
import com.justep.ui.serializer.NoTrimScriptWriter;

public class AppConfigUtils {
	public static void loadAppConfig(String appName, Map<String, Object> vars) {
		String str1 = (Utils.isEmptyString(appName) ? "/UI/appConfig/default" : "/UI/appConfig/" + appName) + "/main.config.xml";
		File file = new File(FileSystemWrapper.instance().getRealPath(str1));
		if (!file.exists()) {
			file = new File(FileSystemWrapper.instance().getRealPath("/UI/appConfig/main.config.xml"));
		}
		try {
			SAXReader localSAXReader = new SAXReader();
			Document doc = localSAXReader.read(file);
			List items = doc.selectNodes("/root/item");
			Iterator itor = items.iterator();
			while (itor.hasNext()) {
				Element ele = (Element) itor.next();
				vars.put(ele.attributeValue("name"), ele.getText());
			}
		} catch (Exception localException) {
			throw new RuntimeException(localException);
		}

	}

	public static void writeFile(Document paramDocument, String paramString, boolean paramBoolean) {
		FileOutputStream localFileOutputStream = null;
		NoTrimScriptWriter localNoTrimScriptWriter = null;
		try {
			File localFile = new File(paramString).getCanonicalFile();
			if (!localFile.getParentFile().exists())
				localFile.getParentFile().mkdirs();
			OutputFormat localOutputFormat = null;
			if (paramBoolean)
				localOutputFormat = OutputFormat.createPrettyPrint();
			else
				localOutputFormat = OutputFormat.createCompactFormat();
			localFileOutputStream = new FileOutputStream(localFile);
			localNoTrimScriptWriter = new NoTrimScriptWriter(localFileOutputStream, localOutputFormat);
			localNoTrimScriptWriter.write(paramDocument);
		} catch (FileNotFoundException localFileNotFoundException) {
			throw UIException.create(localFileNotFoundException, "JUSTEP000033", new Object[] { paramString });
		} catch (IOException localIOException1) {
			throw UIException.create(localIOException1, "JUSTEP000033", new Object[] { paramString });
		} catch (TransformerFactoryConfigurationError localTransformerFactoryConfigurationError) {
			throw UIException.create(localTransformerFactoryConfigurationError, "JUSTEP000033", new Object[] { paramString });
		} finally {
			if (localFileOutputStream != null)
				try {
					localFileOutputStream.close();
				} catch (IOException localIOException2) {
				}
			if (localNoTrimScriptWriter != null)
				try {
					localNoTrimScriptWriter.close();
				} catch (IOException localIOException3) {
				}
		}
	}
}
