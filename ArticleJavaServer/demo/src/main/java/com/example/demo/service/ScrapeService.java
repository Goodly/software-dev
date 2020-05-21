package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.apache.commons.lang3.*;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScrapeService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ScrapeService.class);
	@Autowired private EnvironmentService env;
	
	public String scrapeArticle(String url) {

		logger.info("scraping article ");		
		
		ProcessBuilder pb;
		if (System.getProperty("os.name").contains("ows")) {
			pb = new ProcessBuilder("python", "\\var\\scrape.py", url);
		} else {
			pb = new ProcessBuilder("/home/python3_env/bin/python3", "/home/scraper/scrape.py", url);
		}
		pb.redirectErrorStream(true); // equivalent of 2>&1
		StringBuffer x = new StringBuffer();
		try {
			Process p = pb.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(),StandardCharsets.UTF_8));
			String l = "";
			while ((l = reader.readLine()) != null) {
				logger.info(l);
				x.append(l);
				x.append(System.lineSeparator());
				//x.append(System.lineSeparator());
			}
		} catch (IOException e2) {
//			 TODO Auto-generated catch block
			e2.printStackTrace();
		}
		return x.toString();
	}
	
}
