package com.example.demo.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;
import com.example.demo.service.ScrapeService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/article")
public class ArticleController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired ArticleService articleService;
	@Autowired ScrapeService scrapeService;
	//@Autowired FileService fileService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<ArticleEntity> getAllArticles(
		@RequestParam(required = false, name="status") String statusCode,
		@RequestParam(required = false, name="title") String title,
		@RequestParam(required = false, name="url") String url
	) {
		if (statusCode != null) {
			return articleService.findArticleByStatus(statusCode); 
		}
		if (title != null) {
			return articleService.findArticleByTitle(title);
		}
		if (url != null) {
			ArticleEntity a = articleService.findArticleByUrl(url);
			List<ArticleEntity> al = new ArrayList<ArticleEntity>();
			al.add(a);
			return al;
		}
		return articleService.findAllArticles();
	}

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public String newArticle(
		@RequestParam(required = true, name="url") String url
	) {
		ArticleEntity article = articleService.findArticleByUrl(url);
		JSONObject returnVal = new JSONObject();
		
		
		if (article != null) {
			returnVal.put("firstSubmit", true);			
		} else {
			article = articleService.processSubmitArticle(url);
			returnVal.put("firstSubmit", false);
		}
		
		returnVal.put("count", 7777777);
		returnVal.put("article", new JSONObject(article));
		return returnVal.toString(3);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public void updateArticles(
		@RequestParam(required = true, name="url") String url
	) {
		List<ArticleEntity> articles = findAllArticles()

		ArticleEntity updateArticleWithBuzz(JSONObject jArticle, ArticleEntity article)
		
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ArticleEntity getArticleById(@PathVariable("id") Integer id) {
		return articleService.findArticleById(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public ArticleEntity updateArticleFields(@PathVariable("id") Integer id,
			@RequestBody ArticleEntity article) {
		logger.info("herrrrrrrrrrrrre>>>>" + id.toString());
		logger.info("updating article" + ">>>" + article.getTitle() + "<<< >>>" + article.getAuthor() + "<<<<");
		return articleService.updateArticle(id, article, "article controller - POST update article object");
	}

	@RequestMapping(value = "/{id}/status/{status}", method = RequestMethod.POST)
	public ArticleEntity getArticleById(@PathVariable("id") Integer id,
			@PathVariable("status") String status) {
		return articleService.updateStatus(id, status, "Comment Placeholder - article controller - POST /status");
	}

	@RequestMapping(value = "/scrape", method = RequestMethod.GET)
	public String scrape(@RequestParam(required = true, name="url") String url) {
		return scrapeService.scrapeArticle(url);
	}

	@RequestMapping(value = "/{sha}/tagworksId", method = RequestMethod.POST)
	public ArticleEntity storeVizData(@PathVariable("sha") String sha,
			@RequestBody String visData) {
		return articleService.updateVizData(sha, visData, "article controller - POST update vizdata vy sha");
	}

	
}
