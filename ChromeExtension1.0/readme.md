# Query Mini-Extension

Submit articles to be vetted by Public Editor conveniently through this extension. This extension also automatically checks if the article you visit has already been vetted.


The rest of this readme describes the function of each line of code in the mini-extension. Each line in the description corresponds with a line of code in the respective file.
The only files that are necessary to the functioning of the Mini-Extension are the following:

## manifest.json: 

This is the foundational structure of the Chrome Extension.
This is the second version of the manifest.json file.
This is the name of this extension.
This is the description of the extension. 
This is the version of the extension.
This extension requires access to the "tabs" permission, which retrieves the tabs you have open.
This extension can be used on most pages, so we use "browser_action" instead of "page_action", 
which is reserved for more limited extensions (can only use on a few pages).
This "browser_action" is linked to the popup defined by popup.html.

## popup.html:

This is the code governing the appearance of the popup that appears in when you click the Query 
Extension's icon in the top right-hand corner of your browser.
Start of the HTML code.
Start Body of the HTML.
This button checks if the current URL is in the database.
This is where the result of the above check is written.
This is the script that runs the relevant code.
End Body of the HTML.
End HTML Code.

## popup-style.css

Handles formatting and styling of HTML content.

## popup.js: 

Shows a preview of the website to submitted and whether or not an article has already been vetted. 
Imports verify.js to check if a URL has already been submitted. It only allows users to submit articles if not already submitted.
	
## background.js: 

This code updates the icon of the chrome extension. If an article has already 
been vetted, users will see the icon change and will not need to resubmit. Listens to various 
events to know when to check or recheck if an article is vetted. 

## background.html: 

Makes the importing of verify.js into background.js possible.

## verify.js: 
This is the code that handles the verification. Retrieves the articles
from the Public Editor server, and checks if the given URL is vetted.

