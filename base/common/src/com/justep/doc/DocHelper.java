package com.justep.doc;

import java.io.File;

public class DocHelper {
	public static File getOrCreateFile(String path) {
		File storeDir = new File(path);
		if (!(storeDir.exists() && storeDir.isDirectory())) {
			storeDir.mkdirs();
		}
		return storeDir;
	}
}
