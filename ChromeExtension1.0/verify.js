/**
 * Checks if an article has been audited (and submitted). 
 * For example, this function called on
 * https://www.vox.com/science-and-health/2017/2/16/14622198/doctors-prescribe-opioids-varies-patients-hooked
 * would callback on true since it has been audited by public editor.
 *
 * @param {string} url The url of the article to be verified.
 * @param {function} Calls one param with true if the article has been audited, else false.
 */

export default async function verifyAudit(url, callback) {
	if (!url) {
		callback(false);
		return;
	}
	let response = await fetch("http://localhost:8888/demo-0.0.1-SNAPSHOT/article/?url=" + url);
	let articleObjects = (await response.json())[0];
	if (articleObjects && articleObjects.visData) {
		callback(true);
		return;
	}
	callback(false);
}
