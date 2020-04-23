package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.*;
import org.json.JSONObject;
import org.rauschig.jarchivelib.ArchiveFormat;
import org.rauschig.jarchivelib.Archiver;
import org.rauschig.jarchivelib.ArchiverFactory;
import org.rauschig.jarchivelib.CompressionType;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.ArticleEntity;
import com.example.demo.repository.ArticleRepository;

@Service
public class FileService {
	/*
	 * scrape article
	 * - get url from article object
	 * - call python (returns article text (string))
	 * - update article object (save to db)
	 * 
	 * place article and metadata on file system
	 * - store article text in /var/article/temp/text.txt
	 * - store metadata in /var/article/temp/metadata.txt
	 * 
	 * zip
	 * - tar gzip using /var/article folder, giving var/article.tar.gzip
	 * - rename to var/article/<url>.tgz
	 * 
	 */
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(FileService.class);
	@Autowired ArticleService articleService;
	@Autowired ArticleRepository articleRepository;
	
	public boolean fileExists(String pathAndName) {
		
		return Files.exists(Paths.get(pathAndName)); 
	}
	public ArticleEntity makeFile(ArticleEntity article) {

		String sha256hex = DigestUtils.sha256Hex(article.getArticleText());
		// set HASH
		article.setArticleHash(sha256hex);
		
		//set filename (first 60 chars AFTER last slash plus ".txt"
		String[] parts = article.getUrl().split("/");
		String filename = parts[parts.length - 1];
		if (filename.length() == 0) filename = "noname";
		int endChar = filename.length();
		if (endChar > 60) 
			endChar = 59;
		else 
			endChar = endChar - 1;
		
		filename = filename.substring(0, endChar).concat(".txt");
		
				
		// strip off https:// or http://
		String tempURL = article.getUrl();
		String tempURL2 = tempURL.replace("https://", "");
		String URLNoProtocol = tempURL2.replace("http://","");

		String articleDir = "/var/article/temp/";
		String zipDestDir = "/var/article/";
		String zipDestFilename = "article";
		String articleFilename = articleDir + filename;
		String metadataFilename = articleDir + "metadata.json";
		
		File destFile = new File(zipDestDir + URLNoProtocol + "/" + sha256hex + ".tgz");
		article.setFilename(destFile.toString());


		//*******************************************************
		// CREATE ARTICLE FILE (text.txt)
		File articleFile = new File(articleFilename);
		try {
			FileUtils.writeStringToFile(articleFile, article.getArticleText(), Charset.defaultCharset(), false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE METADATA FILE (metadata.json)
		JSONObject metadata = new JSONObject();
		
		metadata.put("extra", new JSONObject(article));
		metadata.put("file_sha256", sha256hex);
		metadata.put("filename", filename);

		File metadataFile = new File(metadataFilename);
		try {
			FileUtils.writeStringToFile(metadataFile, metadata.toString(4), Charset.defaultCharset(), false);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE tgz 
		
		String archiveName = "article";
		File zipSourceDirFile = new File(articleDir);
		File zipDestDirFile = new File(zipDestDir);
		
		Archiver archiver = ArchiverFactory.createArchiver(ArchiveFormat.TAR, CompressionType.GZIP);
		
			
		try {
			
			File archive = archiver.create(zipDestFilename, zipDestDirFile, zipSourceDirFile);
			destFile.getParentFile().mkdirs();
			
			logger.info(archive.toPath().toString());
			logger.info(destFile.toString());

			Path temp = Files.move(
					archive.toPath(), 
					destFile.toPath(), 
					StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//delete temp file
		FileUtils.deleteQuietly(articleFile);
		
		//delete metadata file
		FileUtils.deleteQuietly(metadataFile);

		return article;

	}
	
}
