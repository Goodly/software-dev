package com.example.demo.service;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(EnvironmentService.class);
	
	@Autowired private Environment env;
	private boolean dev = false;
	public boolean isDev() {
	    String d = env.getProperty("com.example.demo.environment"); 
	    if (d != null && d.equals("DEV")) { 
	    	dev = true;
	    	logger.info("EnvironmentService - running in dev");
	    } else {
	    	dev = false;
	    }
	    return dev;
	}
}
