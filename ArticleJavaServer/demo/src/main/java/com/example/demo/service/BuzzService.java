package com.example.demo.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.service.ArticleService;

@Service
public class BuzzService {

private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzService.class);
	
	@Autowired ArticleService articleService;
	
	public JSONObject getBuzz(String articleUrl) {
        RestTemplate restTemplate = new RestTemplate();
        StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/articles.json?q=");
        url.append(articleUrl);
        url.append("&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
        ResponseEntity<String> response = restTemplate.getForEntity(url.toString(),String.class);
        if (response == null) {
            JSONObject buzzEntry = new JSONObject().put("author_name", "none");
            return buzzEntry;
        }
        String res = response.getBody();
        logger.info(res);
        JSONObject j = new JSONObject(res);
        logger.info(j.toString());
        JSONArray a = j.optJSONArray("results");
        JSONObject buzzEntry = null;
        if (a != null && a.length() > 0) {
            buzzEntry = a.getJSONObject(0);
            logger.info("buzzEntry.toString():");
            logger.info(buzzEntry.toString());
            logger.info("numWords: " + buzzEntry.opt("num_words").toString());
            logger.info("totalShares: " + buzzEntry.opt("total_shares").toString());
        } else {
            buzzEntry = new JSONObject().put("author_name", "none");
        }
        return buzzEntry;
	}
	
	public JSONArray getTodaysTop() {
		RestTemplate restTemplate = new RestTemplate();
		//StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/trends.json?topic=politics&search_type=trending_now&hours=24&countries=United%20States&count=10");
		//StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/trends.json?topic=politics&search_type=trending_now&hours=24&count=10");
		StringBuilder url = new StringBuilder("https://api.buzzsumo.com/search/trends.json?topic=coronavirus,covid&search_type=trending_now&hours=24&count=25&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf&countries=United States");
        //'https://api.buzzsumo.com/search/trends.json?topic=politics&search_type=trending_now&hours=24&countries=United%20States%2C%20Canada&count=50&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf'
		url.append("&api_key=ZjO3Gfio4kfOaZ9K9iSdQcjoGsleT1Gf");
        
        logger.info(url.toString());

        ResponseEntity<String> response = restTemplate.getForEntity(url.toString(),String.class);
        String res = response.getBody();
        JSONObject j = new JSONObject(res);
        JSONArray a = j.optJSONArray("results");
        JSONArray filtered = new JSONArray();
        a.forEach(art -> {
        	JSONObject article = (JSONObject) art;
        	
        	boolean add = true;
            
        	//exclude youtube
        	if (article.optString("domain_name", "").equals("youtube.com")) {
            	logger.info("skipping youtube");
            	add = false;
            } 
    		// exclude word count > 700
            logger.info(article.toString(2));
        	if (article.optInt("num_words", 701) > 700) {
            	logger.info("skipping > 700 words");
            	add = false;
            }
        	
            if (add) {
            	logger.info(j.toString(2));
            	filtered.put(article);
            }            	
            
        });
        
        return filtered;
        
	}

}
