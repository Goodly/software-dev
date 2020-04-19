package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.service.ArticleService;

@Service
public class AWSService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(AWSService.class);
	
	@Autowired ArticleService articleService;
	@Autowired FileService fileService;
	
	public String sendToS3(List<ArticleEntity> toSend) {
		String m = "in AWSService.sendToS3. Sending " + toSend.size() + " articles to s3";
		StringBuilder results = new StringBuilder(m);
		results.append(System.lineSeparator());
		logger.info(m);		
		
		toSend.forEach(article -> {
			
			if (article.getFilename() == null || fileService.fileExists(article.getFilename()) == false) {
				String msg = "filename null or does not exist for article id " + article.getId() + "- making file"; 
				results.append(msg);
				results.append(System.lineSeparator());
				logger.info(msg);
				article = fileService.makeFile(article);
				// this sets filename and hash so we need to save
				articleService.save(article);
			} 
			
			StringBuilder tmpResults = new StringBuilder("calling s3-put.py with article id = " + article.getId());
			tmpResults.append(System.lineSeparator());
			tmpResults.append(article.getArticleTitle());
			tmpResults.append(System.lineSeparator());
			tmpResults.append(article.getArticleHash());
			tmpResults.append(System.lineSeparator());
			tmpResults.append(article.getFilename());
			tmpResults.append(System.lineSeparator());
			logger.info(tmpResults.toString());
			
			results.append(tmpResults);

			ProcessBuilder pb = new ProcessBuilder("/home/python3_env/bin/python3", "/home/scraper/s3-put.py",article.getFilename());

			pb.redirectErrorStream(true); // equivalent of 2>&1
			try {
				Process p = pb.start();
				BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream(),StandardCharsets.UTF_8));
				String l = "";
				while ((l = reader.readLine()) != null) {
					logger.info(l);
					results.append(l);
					results.append(System.lineSeparator());
				}
			} catch (IOException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
		});
		return results.toString();
	}
	

}
