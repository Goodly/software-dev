package com.example.demo.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

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

import com.example.demo.controller.BuzzController;
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
				
		// strip off https:// or http://
		String tempURL = article.getUrl();
		String tempURL2 = tempURL.replace("https://", "");
		String URLNoProtocol = tempURL2.replace("http://","");

		String articleDir = "/var/article/temp/";
		String zipDestDir = "/var/article/";
		String zipDestFilename = "article";
		String articleFilename = articleDir + "text.txt";
		String metadataFilename = articleDir + "metadata.json";

		//*******************************************************
		// CREATE ARTICLE FILE (text.txt)
		File articleFile = new File(articleFilename);
		try {
			FileUtils.writeStringToFile(articleFile, article.getArticleText(), true);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//*******************************************************
		// CREATE METADATA FILE (metadata.json)
		JSONObject metadata = new JSONObject();
		
		metadata.put("extra", new JSONObject(article));
		metadata.put("file_sha256", sha256hex);
		metadata.put("filename", articleFile.getName());

		File metadataFile = new File(metadataFilename);
		try {
			FileUtils.writeStringToFile(metadataFile, metadata.toString(4), false);
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
		
		File destFile = new File(zipDestDir + URLNoProtocol + sha256hex + ".tgz");
			
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

		article.setFilename(destFile.toString());
		return article;

	}
	
}
