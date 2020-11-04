package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import com.example.demo.repository.ArticleRepository;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.entities.BuzzJobEntity;
import com.example.demo.service.ArticleService;
import com.example.demo.service.AuthService;
import com.example.demo.service.BuzzJobService;
import com.example.demo.service.BuzzService;
import com.example.demo.service.ScrapeService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/article")
public class ArticleController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(ArticleController.class);
	
	@Autowired ArticleService articleService;
	@Autowired ScrapeService scrapeService;
	@Autowired ArticleRepository articleRepository;
	@Autowired BuzzService buzzService;
	@Autowired BuzzJobService buzzJobService;
	@Autowired AuthService authService; 
	
	///article?status=BUZZ&url=http://washingtonpost.com/asdfasfd

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity getAllArticles(
		HttpServletRequest request,
		@RequestParam(required = false, name="status") String statusCode,
		@RequestParam(required = false, name="title") String title,
		@RequestParam(required = false, name="url") String url
	) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		
		if (statusCode != null) {
			return new ResponseEntity<>(articleService.findArticleByStatus(statusCode), HttpStatus.OK);
		}
		if (title != null) {
			return new ResponseEntity<>(articleService.findArticleByTitle(title), HttpStatus.OK);
		}
		if (url != null) {
			return new ResponseEntity<>(articleService.findArticleByUrl(url), HttpStatus.OK);
		}
		return new ResponseEntity<>(articleService.findAllArticles(), HttpStatus.OK);
	}

	// /**return a list of paginated articles for display on the dashboard. An alternative
	//  * to getAllArticles to reduce load time.
	//  */
	// @RequestMapping(value = "/page/{pageNo}/{pageSize}", method = RequestMethod.GET)
	// public ResponseEntity getPaginatedArticles(
	// 	HttpServletRequest request,
	// 	@RequestParam(required = false, name="status") String statusCode,
	// 	@RequestParam(required = false, name="title") String title,
	// 	@RequestParam(required = false, name="url") String url
	// ) {
	// 	if (authService.auth(request) == false) {
	// 		return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
	// 	}
		
	// 	if (statusCode != null) {
	// 		return new ResponseEntity<>(articleService.findArticleByStatus(statusCode), HttpStatus.OK);
	// 	}
	// 	if (title != null) {
	// 		return new ResponseEntity<>(articleService.findArticleByTitle(title), HttpStatus.OK);
	// 	}
	// 	if (url != null) {
	// 		return new ResponseEntity<>(articleService.findArticleByUrl(url), HttpStatus.OK);
	// 	}
	// 	return new ResponseEntity<>(articleService.findPaginated(pageNo, pageSize), HttpStatus.OK);
	// }

    //    @RequestMapping(value = "/tag/{tag}", method = RequestMethod.GET)
    //    public ResponseEntity findArticleByTag(
    //                    HttpServletRequest request,
    //                    @PathVariable("tag") String tag
    //    ) {

    //            return new ResponseEntity<>(articleService.findArticleByTag(tag), HttpStatus.OK);
    //    }

	// /article/submit?url=https://cnn.com/asdfasdgf

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public ResponseEntity newArticle(
		HttpServletRequest request,
		@RequestParam(required = true, name="url") String url
	) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}

		ArticleEntity article = articleService.findArticleByUrl(url);
		JSONObject returnVal = new JSONObject();
		
		if (article != null) {
			returnVal.put("firstSubmit", false);		
			if (article.getSubmitCount() == null) article.setSubmitCount(1);
			article.setSubmitCount(article.getSubmitCount() + 1);
			articleRepository.save(article);
		} else {
			article = articleService.processSubmitArticle(url);
			returnVal.put("firstSubmit", true);
			article.setSubmitCount(1);
			articleRepository.save(article);
		}
		
		returnVal.put("submit_count", article.getSubmitCount());
		returnVal.put("article", new JSONObject(article));
		return new ResponseEntity<>(returnVal.toString(3), HttpStatus.OK);
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET)
	public String updateArticles(
	) {
		return articleService.updateMetrics().toString();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity getArticleById(
			HttpServletRequest request,
			@PathVariable("id") Integer id) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(articleService.findArticleById(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public ResponseEntity updateArticleFields(
			HttpServletRequest request,
			@PathVariable("id") Integer id,
			@RequestBody ArticleEntity article) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		logger.info("updating article" + ">>>" + article.getTitle() + "<<< >>>" + article.getAuthor() + "<<<<");
		return new ResponseEntity<>(articleService.updateArticle(id, article, "article controller - POST update article object"), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}/status/{status}", method = RequestMethod.POST)
	public ResponseEntity setArticleStatus(
			HttpServletRequest request,
			@PathVariable("id") Integer id,
			@PathVariable("status") String status) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(articleService.updateStatus(id, status, "Comment Placeholder - article controller - POST /status"), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}/tag/{tag}", method = RequestMethod.POST)
	public ResponseEntity addArticleTag(
			HttpServletRequest request,
			@PathVariable("id") Integer id,
			@PathVariable("tag") String tag) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(articleService.updateTag(id, tag), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}/tag/{tag}", method = RequestMethod.DELETE)
	public ResponseEntity deleteArticleTag(
			HttpServletRequest request,
			@PathVariable("id") Integer id,
			@PathVariable("tag") String tag) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(articleService.deleteTag(id, tag), HttpStatus.OK);
	}

	@RequestMapping(value = "/{sha}/tagworksId", method = RequestMethod.POST)
	public ResponseEntity storeVizData(
			HttpServletRequest request,
			@PathVariable("sha") String sha,
			@RequestBody String visData) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(articleService.updateVizData(sha, visData, "article controller - POST update vizdata vy sha"), HttpStatus.OK);
	}

	@RequestMapping(value = "/buzz2/{id}", method = RequestMethod.GET)
	public ResponseEntity buzz2(
			HttpServletRequest request,
			@PathVariable Integer id) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		
		logger.info("in buzz2 controller for query ".concat(id.toString()));
		JSONObject r = articleService.processBatchArticle(id);
		return new ResponseEntity<>(r.toString(2), HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/s3", method = RequestMethod.GET)
	public ResponseEntity s3(
			HttpServletRequest request) {
		if (authService.auth(request) == false) {
			return new ResponseEntity<String>("Not Authorized", HttpStatus.UNAUTHORIZED);
		}
		
		logger.info("in s3 controller");
		JSONObject r = new JSONObject();
		r.put("result", articleService.sendToS3());
		return new ResponseEntity(r.toString(2), HttpStatus.OK);
		
	}




}
