import verifyAudit from "./verify.js";

/**
 * Gets the URL previewed.
 * 
 * @return String of the URL
 */
function getURL() {
	return document.getElementById("websiteURL").value;
}

/** 
 * Check if the current URL is in the database of article URLs when submitting.
 * Used by XMLHttpRequest.onreadystatechange.
 */ 
function checkURL() {
	//Note: this.responseText is generated before this function is called. The responseText is what our server responds to the request with, but converted into a string.
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("result").innerText = "This article has already been submitted.";
	} else if (this.readyState == 4 && this.status == 500) {
		let response = JSON.parse(this.responseText);
		if (response.error.localeCompare("Internal Server Error") === 0 
			&& response.message.localeCompare("No message available") === 0
			&& response.path.localeCompare("/demo-0.0.1-SNAPSHOT/article/submit") === 0) {
			//When submits for the first time, error 500 with specific message
		document.getElementById("result").innerText = "Thank you for submitting this article!";  
		}
	} else if (this.readyState == 4) {
		document.getElementById("result").innerText = "Error : " + this.responseText;
	} else {
		document.getElementById("result").innerText = "Loading...";
	}
}

/**
 * Submits the target URL to the article funnel server. 
 * 
 * @param {String} targetURL URL to be submitted.
 */
function submitURL(targetURL) {
	//Generate a new request.
	var xhttp = new XMLHttpRequest();
	//Do the following function when ready.
	xhttp.onreadystatechange = checkURL;
	//The first part of the queried URL allows us to make Cross Origin HTTPS requests,
	//The second part of the URL submits the URL to the database.
	xhttp.open("POST", "http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/submit?url=" 
		+ targetURL.toString(), true);
	xhttp.send();
}

/**
 * Sets placeholder form text to be current tab's URL.
 * 
 * @param {String} url The URL to be previewed.
 */
function setPreviewURL(url) {
	document.getElementById("websiteURL").defaultValue = url;
}

/**
 * Visualizes whether or not an article has already been submitted and audited. The logic of 
 * verification is handled by the function verifyAudit. This function focuses on only the 
 * popup visuals. This means icon visual updates are handled in background.js
 * 
 * @param {boolean} audited Whether or not an article has already been submitted and audited.
 */
function indicateAudited(audited) {
	if (audited) {	
		document.getElementById("captureButton").disabled = true;
		document.getElementById("result").innerText = "This article has already been submitted.";
	}
}

/** When document is loaded, set up button and visualize verifyAudit. */
document.addEventListener('DOMContentLoaded', () => {
    const capture = document.getElementById('captureButton');
    capture.onclick = () => {
        if (!capture.disabled) {
          submitURL(getURL());
        }
	};
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, indicateAudited);
	});

});

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	setPreviewURL(tabs[0].url);
});
