package com.example.demo.service;

import org.jose4j.jwa.AlgorithmConstraints;
import org.jose4j.jwa.AlgorithmConstraints.ConstraintType;
import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.JsonWebKeySet;
import org.jose4j.jwk.VerificationJwkSelector;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.lang.JoseException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;



@Service
public class AuthService {
	private static org.slf4j.Logger logger = LoggerFactory.getLogger(AuthService.class);
	
	// Create a new JsonWebSignature object
    private JsonWebSignature jws = new JsonWebSignature();
    private JsonWebKeySet jsonWebKeySet = null;
	private String FUNNEL_ADMINISTRATOR = "Funnel_Administrator";


	AuthService() {
	    jws.setAlgorithmConstraints(new AlgorithmConstraints(ConstraintType.WHITELIST,   AlgorithmIdentifiers.RSA_USING_SHA256));
	    loadJWKS();
	}
	
	private boolean loadJWKS() {
		
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity("https://cognito-idp.us-west-2.amazonaws.com/us-west-2_3WfdrDN9A/.well-known/jwks.json",String.class);
		String res = response.getBody();

	    // Create a new JsonWebKeySet object with the JWK Set JSON
		try {
			jsonWebKeySet = new JsonWebKeySet(res);
		} catch (JoseException e1) {
			// TODO Auto-generated catch block
			logger.info("error loading jwks");
			e1.printStackTrace();
			return false;
		}
		return true;
	}
	
		
	public boolean auth(HttpServletRequest request) {
		return authorize(request.getHeader("x-amzn-oidc-accesstoken"));
	}
	
	private boolean authorize(String compactSerialization) {
		
		if (compactSerialization == null || compactSerialization.length() < 1) {
			logger.info("header not present - dev mode - accept");
			return true;
		}
	    
		// Set the compact serialization on the JWS
	    try {
			jws.setCompactSerialization(compactSerialization);
		} catch (JoseException e1) {
			// TODO Auto-generated catch block
			logger.info("error setting access token into jws");
			e1.printStackTrace();
			return false;
		}

	    // The JWS header contains information indicating which key was used to secure the JWS.
	    // In this case (as will hopefully often be the case) the JWS Key ID
	    // corresponds directly to the Key ID in the JWK Set.
	    // The VerificationJwkSelector looks at Key ID, Key Type, designated use (signatures vs. encryption),
	    // and the designated algorithm in order to select the appropriate key for verification from
	    // a set of JWKs.
	    VerificationJwkSelector jwkSelector = new VerificationJwkSelector();
	    JsonWebKey jwk = null;
		try {
			jwk = jwkSelector.select(jws, jsonWebKeySet.getJsonWebKeys());
		} catch (JoseException e) {
			logger.info("key not found in jwks - reloading jwks");
			loadJWKS();
			try {
				jwk = jwkSelector.select(jws, jsonWebKeySet.getJsonWebKeys());
			} catch (JoseException e2) {
				logger.info("error - kid not found in reloaded jwks");
				e2.printStackTrace();
				return false;
			}
		}

	    // The verification key on the JWS is the public key from the JWK we pulled from the JWK Set.
	    jws.setKey(jwk.getKey());

	    // Check the signature
	    boolean signatureVerified = false;
		try {
			signatureVerified = jws.verifySignature();
		} catch (JoseException e) {
			// TODO Auto-generated catch block
			logger.info("provided signature does not match calculated signature");
			e.printStackTrace();
			return false;
		}

	    // Do something useful with the result of signature verification
	    logger.info("JWS Signature is valid: " + signatureVerified);

	    // Get the payload, or signed content, from the JWS
	    String payload = null;
		try {
			payload = jws.getPayload();
		} catch (JoseException e) {
			// TODO Auto-generated catch block
			logger.info("error getting payload from header - signature OK");
			e.printStackTrace();
			return false;
		}

	    // Do something useful with the content
	    System.out.println("JWS payload: " + payload);
	    
	    JSONObject token = new JSONObject(payload);
	    
	    // check for Funnel_Administrator in cognito:groups
	    JSONArray groups = token.getJSONArray("cognito:groups");
	    boolean r = false;
	    for (int x = 0; x < groups.length(); x++ ) {
	    	if (groups.getString(x).equals(FUNNEL_ADMINISTRATOR)) 
	    		r = true;
	    }
	    
	    if (r == false) {
	    	logger.info("error - access token not a member of authorized group");
	    	return false;
	    } else {
	    	logger.info("token is a member of authorized group");
	    }
	    
	    // check for expired token
		long tokenExpires = token.getLong("exp");
		long timeNow = new Date().getTime() / 1000;
		
		if (tokenExpires < timeNow ) {
			logger.info("error - token has expired");
			return false;
		} else {
			logger.info("token expiration is OK");		
		}
		return true;

	}
	
}
