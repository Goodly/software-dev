import verifyAudit from "./verify.js";

/**
 * Sets the chrome icon to green if vetted, default otherwise.
 * 
 * @param {boolean} audited Whether or the current tab has been vetted.
 */
function changeIcon(audited) {
	if (audited) {
		chrome.browserAction.setIcon({
			path: {
				"48": "images/pe48 - green.png",
				"128": "images/pe128 - green.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"48": "images/pe48.png",
				"128": "images/pe128.png"
			}
		});
	}
}
/**
 * Change icon according to current tab's URL.
 */
function changeIconBasedOnUrl() {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		console.log(tabs);
		verifyAudit(tabs[0].url, changeIcon);
	});
}

/** On url changes, reverify. */
chrome.tabs.onUpdated.addListener(changeIconBasedOnUrl);
chrome.tabs.onCreated.addListener(changeIconBasedOnUrl);
chrome.tabs.onActivated.addListener(changeIconBasedOnUrl);
chrome.windows.onFocusChanged.addListener(changeIconBasedOnUrl);
