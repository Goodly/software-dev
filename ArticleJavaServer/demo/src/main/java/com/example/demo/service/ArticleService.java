package com.example.demo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.controller.ArticleController;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.StatusEntity;
import com.example.demo.entities.ArticleHasStatusEntity;
import com.example.demo.repository.ArticleHasStatusRepository;
import com.example.demo.repository.ArticleRepository;
import com.example.demo.repository.StatusRepository;

import com.example.demo.service.BuzzService;
import com.example.demo.service.FileService;

@Service
public class ArticleService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired private ArticleRepository articleRepository;
	@Autowired private StatusRepository statusRepository;
	@Autowired private ArticleHasStatusRepository articleHasStatusRepository;
	@Autowired private BuzzService buzzService;
	@Autowired private FileService fileService;
	@Autowired private ScrapeService scrapeService;
	@Autowired private AWSService awsService;

	
	public ArticleEntity findArticleById(Integer id) {
		Optional<ArticleEntity> a = articleRepository.findById(id);
		if (a.isPresent())
			return a.get();
		else
			return null;
	}
	
	public List<ArticleEntity> findArticleByStatus(String statusCode) {
		return articleRepository.findByStatusCode(statusCode);
	}

	public ArticleEntity findArticleByUrl(String url) {
		Optional<ArticleEntity> a = articleRepository.findByUrl(url);
		if (a.isPresent()) {
			return a.get();
		} else {
			return null;
		}
	}
	
	public ArticleEntity processSubmitArticle(String url) {
		// create new record
		ArticleEntity newArticle = createNewArticle(url, "USER");
		
		//see if it's in buzzsumo
		JSONObject jArticle = buzzService.getBuzz(url);
		
		//update with buzz fields
		newArticle = updateArticleWithBuzz(jArticle, newArticle);
		
		//scrape article, 
		newArticle.setArticleText(scrapeService.scrapeArticle(url));
		
		// sha256, create metadata, tar.gz
		newArticle = fileService.makeFile(newArticle);	
		
		articleRepository.save(newArticle);
		return newArticle;

	}

	public JSONArray updateMetrics() {
		JSONArray list = new JSONArray();
		List<ArticleEntity> buzzArticles = articleRepository.findByStatusCode("BUZZ");
		List<ArticleEntity> userArticles = articleRepository.findByStatusCode("USER");
		for (ArticleEntity article : buzzArticles) {
			String title = article.getTitle();
			if (title.equals("")) {
				continue;
			}
			logger.info(title);
			String url = article.getUrl();
			JSONObject jArticle = buzzService.getBuzz(url);
			logger.info(jArticle.toString());
			if (jArticle.get("author_name").toString().equals("none")) {
				continue;
			}
			ArticleEntity updatedArticle = updateArticleWithBuzz(jArticle, article);
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));
			updatedArticle.setUpdatedAt(updatedAt);
			articleRepository.save(updatedArticle);
			list.put(jArticle);
		}

		for (ArticleEntity article : userArticles) {
			String url = article.getUrl();
			JSONObject jArticle = buzzService.getBuzz(url);
			if (jArticle.get("author_name").toString().equals("none")) {
				continue;
			}
			ArticleEntity updatedArticle = updateArticleWithBuzz(jArticle, article);
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));
			updatedArticle.setUpdatedAt(updatedAt);
			articleRepository.save(updatedArticle);
			list.put(jArticle);
		}

		return list;

	}
	
	public JSONArray processBatchArticle() {
		logger.info("in articleService - processBatchArticle");
		
		JSONArray articles = buzzService.getTodaysTop();
		
		logger.info("got todays top from buzz - processing articles " + articles.length());
		
		articles.forEach(article -> {
			
			// for each article, get its url
			JSONObject ar = (JSONObject) article;
			String url = ar.optString("url");

			// see if its in the db already
			ArticleEntity existingArticle = this.findArticleByUrl(url);
			
			ArticleEntity updatedArticle = new ArticleEntity();
			
			// if not, create it
			if (existingArticle == null) {
				
				logger.info("new article - creating " + url);
				
				// create new record
				updatedArticle = createNewArticle(url, "BUZZ");
		
				//update with buzz fields
				updatedArticle = updateArticleWithBuzz(ar, updatedArticle);
			
				//scrape article, 
				updatedArticle.setArticleText(scrapeService.scrapeArticle(url));
			
				// sha256, create metadata, tar.gz
				updatedArticle = fileService.makeFile(updatedArticle);

			} else {

				//existing article - update metadata
				logger.info("existing article - updating " + existingArticle.getUrl());
				updatedArticle = updateArticleWithBuzz(ar, existingArticle);
			}
			
			//set article's date updated
			Integer updatedAt = Integer.parseInt(new SimpleDateFormat("YYYYMMDD").format(new Date()));			//long epoch = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/01/1970 01:00:00").getTime() / 1000;
			updatedArticle.setUpdatedAt(updatedAt);
			
			// save newly created or updated article
			articleRepository.save(updatedArticle);

		});
		return articles;

		

	}
		
	public String sendToS3() {
		StringBuilder s = new StringBuilder();
		
		List<ArticleEntity> articlesToSend = articleRepository.findByStatusCode("APPROVED");
		
		String m1 = "in articleController.sendToS3. Sending " + articlesToSend.size() + " articles to s3";
		logger.info(m1);
		s.append(m1);
		s.append(awsService.sendToS3(articlesToSend));
		return s.toString();
	}
	
	public ArticleEntity createNewArticle(String url, String status) {
		ArticleEntity a = new ArticleEntity();
		a.setUrl(url);
		ArticleEntity b = articleRepository.save(a);
		ArticleHasStatusEntity ahs = new ArticleHasStatusEntity();
		ahs.setArticleId(b.getId());
		Optional<StatusEntity> s = statusRepository.findByStatusCode(status);
		if (s.isPresent()) {
			ahs.setArticleStatusId(s.get().getId());
		} else {
			ahs.setArticleStatusId(1);
		}
		ArticleHasStatusEntity newAhs = articleHasStatusRepository.save(ahs);
		Optional<ArticleEntity> c = articleRepository.findById(b.getId());
		if (c.isPresent()) {
			return c.get();
		} else {
			return null;
		}
	}

	public List<ArticleEntity> findArticleByTitle(String title) {
		return articleRepository.findByTitle(title);
	}
	
	public List<ArticleEntity> findAllArticles() {
		Iterable<ArticleEntity> articleIterable = articleRepository.findAll();
		List<ArticleEntity> list = new ArrayList<ArticleEntity>();
		articleIterable.forEach(list::add);
		return list;
	}
	
	public ArticleEntity updateStatus(Integer id, String status, String comment) {
		Optional<ArticleEntity> articleToFind = articleRepository.findById(id);
		
		ArticleEntity foundArticle;
		if (articleToFind.isPresent()) 
			foundArticle = articleToFind.get();
		else
			return null;
			
		Optional<StatusEntity> dbStatusToFind = statusRepository.findByStatusCode(status);
		
		if (dbStatusToFind.isPresent()) {
			ArticleHasStatusEntity newStatus = new ArticleHasStatusEntity();
			StatusEntity dbStatus = dbStatusToFind.get();
			newStatus.setArticleId(foundArticle.getId());
			newStatus.setArticleStatusId(dbStatus.getId());
			newStatus.setDateChanged(new Date());
			newStatus.setComment(comment);
			articleHasStatusRepository.save(newStatus);
			Optional<ArticleEntity> updatedArticleToFind = articleRepository.findById(foundArticle.getId());
			if (updatedArticleToFind.isPresent()) {
				ArticleEntity foundUpdatedArticle = updatedArticleToFind.get();
				return foundUpdatedArticle;
			}
		}
		return null;			
	}
	
	public ArticleEntity updateArticleWithBuzz(JSONObject jArticle, ArticleEntity article) {

		logger.info("article.setAlexaRank("+jArticle.optInt("alexa_rank", 0));
		logger.info("article.setAngryCount("+jArticle.optInt("angry_count", 0));
		logger.info("article.setArticleTitle("+jArticle.optString("title", ""));
		logger.info("article.setAuthor("+jArticle.optString("author_name", ""));
		logger.info("article.setBuzzsumoArticleId("+jArticle.optInt("id", 0));
		logger.info("article.setDomainName("+jArticle.optString("domain_name", ""));
		logger.info("article.setEvergreenScore("+jArticle.optDouble("evergreen_score", Double.parseDouble("0")));
		logger.info("article.setFacebookComments("+jArticle.optInt("facebook_comments", 0));
		logger.info("article.setFacebookLikes("+jArticle.optInt("facebook_likes", 0));
		logger.info("article.setFacebookShares("+jArticle.optInt("total_facebook_shares", 0));
		logger.info("article.setHahaCount("+jArticle.optInt("haha_count", 0));
		logger.info("article.setLoveCount("+jArticle.optInt("love_count", 0));
		logger.info("article.setNumLinkingDomains("+jArticle.optInt("num_linking_domains", 0));
		logger.info("article.setSadCount("+jArticle.optInt("sad_count", 0));
		logger.info("article.setTotalRedditEngagements("+jArticle.optInt("total_reddit_engagements", 0));
		logger.info("article.setTotalShares("+jArticle.optInt("total_shares", 0));
		logger.info("article.setTwitterShares("+jArticle.optInt("twitter_shares", 0));
		logger.info("article.setWowCount("+jArticle.optInt("wow_count", 0));

		article.setAlexaRank(jArticle.optInt("alexa_rank", 0));
		article.setAngryCount(jArticle.optInt("angry_count", 0));
//		article.setArticleAmplifiers(articleAmplifiers);
		article.setArticleTitle(jArticle.optString("title", ""));
		article.setAuthor(jArticle.optString("author_name", ""));
		article.setBuzzsumoArticleId(jArticle.optInt("id", 0));
		article.setDomainName(jArticle.optString("domain_name", ""));
		article.setEvergreenScore(jArticle.optDouble("evergreen_score", Double.parseDouble("0")));
		article.setFacebookComments(jArticle.optInt("facebook_comments", 0));
		article.setFacebookLikes(jArticle.optInt("facebook_likes", 0));
		article.setFacebookShares(jArticle.optInt("total_facebook_shares"));
		article.setHahaCount(jArticle.optInt("haha_count", 0));
		article.setLoveCount(jArticle.optInt("love_count", 0));
		article.setNumLinkingDomains(jArticle.optInt("num_linking_domains", 0));
//		article.setPublishDate(new Date((jArticle.optInt("published_date") * 1000)));
		article.setSadCount(jArticle.optInt("sad_count", 0));
		article.setTotalRedditEngagements(jArticle.optInt("total_reddit_engagements", 0));
		article.setTotalShares(jArticle.optInt("total_shares", 0));
		article.setTwitterShares(jArticle.optInt("twitter_shares", 0));
//		article.setUpdatedAt(updatedAt);
		article.setWowCount(jArticle.optInt("wow_count", 0));
		
		articleRepository.save(article);
		
		return article;
	}
	
	public ArticleEntity save(ArticleEntity article) {
		return articleRepository.save(article);
	}
	
	public ArticleEntity updateArticle(Integer id, ArticleEntity article, String comment) {
		if (article.getId().equals(id)) {
			articleRepository.save(article);
			return article;
		} else {
			return null;
		}
	}

	public ArticleEntity updateVizData(String sha, String visData, String comment) {
		ArticleEntity article = articleRepository.findOneByArticleHash(sha);
		
		if (article != null) {
			article.setVisData(visData);
			articleRepository.save(article);
			return article;
		} else {
			return null;
		}
	}


}
