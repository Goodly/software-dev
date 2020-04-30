package com.example.demo.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.service.BuzzService;
import com.example.demo.service.FileService;
import com.example.demo.entities.ArticleEntity;
import com.example.demo.service.ArticleService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("buzz")
public class BuzzController {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(BuzzController.class);
	
	Process mProcess;
	Process nProcess;

	@RequestMapping(value = "/py", method = RequestMethod.GET)
	public String getBuzzPy() {
		
		logger.info("entering py");	
		Runtime r = Runtime.getRuntime();
		StringBuilder s = new StringBuilder();
		//			s.append("cmd /c dir ");
		s.append("cmd /c c:\\aa\\software-dev\\py\\try4.py ");
		
		try {
			Process p = r.exec(s.toString());
			mProcess = p;
			nProcess = p;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.debug("entering py");	
			
		InputStream stdout = mProcess.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(stdout,StandardCharsets.UTF_8));
		String line;
		try{
			while((line = reader.readLine()) != null){
				System.out.println("stdout: "+ line);
			}
		}catch(IOException e){
			System.out.println("Exception in reading output"+ e.toString());
		}
		
		InputStream stderr = nProcess.getInputStream();
		BufferedReader reader2 = new BufferedReader(new InputStreamReader(stderr,StandardCharsets.UTF_8));
		String line2;
		try{
			while((line2 = reader2.readLine()) != null){
				System.out.println("stderr: "+ line2);
			}
		}catch(IOException e){
			System.out.println("Exception in reading stderr "+ e.toString());
		}
		logger.info("leaving py");	
		
		return "aaa";
	}
	
}
