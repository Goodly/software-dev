package com.example.demo.entities;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table (name="article")
public class ArticleEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ArticleEntity() {}
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected Integer id;
	
	@Column(name="title")
	protected String title = "";
	
	@Column(name="author")
	protected String author = "";
	
	@Column(name="publish_date")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date publishDate = new Date();
	
	@Column(name="article_text")
	protected String articleText = "";
	
	@Column(name="url")
	protected String url = "";
	
	@Column(name="domain_name")
	protected String domainName = "";

	@Column(name="article_amplifiers")
	protected String articleAmplifiers = "";

	@Column(name="article_title")
	protected String articleTitle = "";
	
	@Column(name="updated_at")
	protected Integer updatedAt = 0; //buzzsumo update date

	@Column(name="buzzsumo_article_id")
	protected Integer buzzsumoArticleId = 0;

	@Column(name="published_date")
	@Temporal(TemporalType.TIMESTAMP)
	protected Date publishedDate = new Date();

	@Column(name="total_shares")
	protected Integer totalShares = 0;

	@Column(name="alexa_rank")
	protected Integer alexaRank = 0;

	@Column(name="twitter_shares")
	protected Integer twitterShares = 0;

	@Column(name="love_count ")
	protected Integer loveCount = 0;

	@Column(name="evergreen_score")
	protected Double evergreenScore = Double.valueOf(0);

	@Column(name="total_reddit_engagements")
	protected Integer totalRedditEngagements = 0;

	@Column(name="wow_count")
	protected Integer wowCount = 0;

	@Column(name="facebook_likes")
	protected Integer facebookLikes = 0;

	@Column(name="facebook_comments")
	protected Integer facebookComments = 0;

	@Column(name="sad_count")
	protected Integer sadCount = 0;

	@Column(name="total_facebook_shares")
	protected Integer totalFacebookShares = 0;
	
	@Column(name="angry_count")
	protected Integer angryCount = 0;

	@Column(name="facebook_shares")
	protected Integer facebookShares = 0;

	@Column(name="num_linking_domains")
	protected Integer numLinkingDomains = 0;

	@Column(name="haha_count")
	protected Integer hahaCount = 0;
	
	@Column(name="vis_data")
	protected String visData = "";

	@Column(name="tagworks_id")
	protected Integer tagworksId = 0;

	@Column(name="article_hash")
	protected String articleHash = "";

	@Column(name="filename")
	protected String filename = "";
/*
Table: article
Columns:
id int(11) AI PK 
title char(50) 
author char(50) 
url mediumtext 
publish_date timestamp 
article_text mediumtext 
author_name char(50) 
article_title char(200) 
article_amplifiers varchar(500) 
domain_name char(100) 
updated_at int(11) 
buzzsumo_article_id int(11) 
published_date int(11) 
total_shares int(11) 
thumbnail_url char(200) 
num_words int(11) 
alexa_rank int(11) 
twitter_shares int(11) 
love_count int(11) 
evergreen_score double 
total_reddit_engagements int(11) 
wow_count int(11) 
facebook_likes int(11) 
facebook_comments int(11) 
sad_count int(11) 
total_facebook_shares int(11) 
angry_count int(11) 
facebook_shares int(11) 
num_linking_domains int(11) 
haha_count int(11) 
vis_data mediumtext
tagworks_id int
article_hash char(64)
 */
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "articleId")
	private List<StatusViewEntity> statuses; 

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getArticleText() {
		return articleText;
	}

	public void setArticleText(String articleText) {
		this.articleText = articleText;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<StatusViewEntity> getStatuses() {
		return statuses;
	}

	public void setStatuses(List<StatusViewEntity> statuses) {
		this.statuses = statuses;
	}

	public Date getPublishDate() {
		return publishDate;
	}

	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public String getArticleAmplifiers() {
		return articleAmplifiers;
	}

	public void setArticleAmplifiers(String articleAmplifiers) {
		this.articleAmplifiers = articleAmplifiers;
	}

	public String getArticleTitle() {
		return articleTitle;
	}

	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}

	public Integer getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Integer updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getBuzzsumoArticleId() {
		return buzzsumoArticleId;
	}

	public void setBuzzsumoArticleId(Integer buzzsumoArticleId) {
		this.buzzsumoArticleId = buzzsumoArticleId;
	}


	public Date getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(Date publishedDate) {
		this.publishedDate = publishedDate;
	}

	public Integer getTotalShares() {
		return totalShares;
	}

	public void setTotalShares(Integer totalShares) {
		this.totalShares = totalShares;
	}

	public Integer getAlexaRank() {
		return alexaRank;
	}

	public void setAlexaRank(Integer alexaRank) {
		this.alexaRank = alexaRank;
	}

	public Integer getTwitterShares() {
		return twitterShares;
	}

	public void setTwitterShares(Integer twitterShares) {
		this.twitterShares = twitterShares;
	}

	public Integer getLoveCount() {
		return loveCount;
	}

	public void setLoveCount(Integer loveCount) {
		this.loveCount = loveCount;
	}

	public Double getEvergreenScore() {
		return evergreenScore;
	}

	public void setEvergreenScore(Double evergreenScore) {
		this.evergreenScore = evergreenScore;
	}

	public Integer getTotalRedditEngagements() {
		return totalRedditEngagements;
	}

	public void setTotalRedditEngagements(Integer totalRedditEngagements) {
		this.totalRedditEngagements = totalRedditEngagements;
	}

	public Integer getWowCount() {
		return wowCount;
	}

	public void setWowCount(Integer wowCount) {
		this.wowCount = wowCount;
	}

	public Integer getFacebookLikes() {
		return facebookLikes;
	}

	public void setFacebookLikes(Integer facebookLikes) {
		this.facebookLikes = facebookLikes;
	}

	public Integer getFacebookComments() {
		return facebookComments;
	}

	public void setFacebookComments(Integer facebookComments) {
		this.facebookComments = facebookComments;
	}

	public Integer getSadCount() {
		return sadCount;
	}

	public void setSadCount(Integer sadCount) {
		this.sadCount = sadCount;
	}

	public Integer getTotalFacebookShares() {
		return totalFacebookShares;
	}

	public void setTotalFacebookShares(Integer totalFacebookShares) {
		this.totalFacebookShares = totalFacebookShares;
	}

	public Integer getAngryCount() {
		return angryCount;
	}

	public void setAngryCount(Integer angryCount) {
		this.angryCount = angryCount;
	}

	public Integer getFacebookShares() {
		return facebookShares;
	}

	public void setFacebookShares(Integer facebookShares) {
		this.facebookShares = facebookShares;
	}

	public Integer getNumLinkingDomains() {
		return numLinkingDomains;
	}

	public void setNumLinkingDomains(Integer numLinkingDomains) {
		this.numLinkingDomains = numLinkingDomains;
	}

	public Integer getHahaCount() {
		return hahaCount;
	}

	public void setHahaCount(Integer hahaCount) {
		this.hahaCount = hahaCount;
	}

	public String getVisData() {
		return visData;
	}

	public void setVisData(String visData) {
		this.visData = visData;
	}

	public Integer getTagworksId() {
		return tagworksId;
	}

	public void setTagworksId(Integer tagworksId) {
		this.tagworksId = tagworksId;
	}

	public String getArticleHash() {
		return articleHash;
	}

	public void setArticleHash(String articleHash) {
		this.articleHash = articleHash;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}
	
	
}
