var listofarticles = [];

function readVisData() {
    $.get("https://cors-anywhere.herokuapp.com/" + "https://s3-us-west-2.amazonaws.com/publiceditor.io/Articles/visData.json").done(function(data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            var article = data[i];
            var articleEntry = new ArticleData(article["Title"], article["Author"], article["Date"], article["ID"], article["Article Link"], article["Visualization Link"], article["Plain Text"], article["Highlight Data"]);
            articleEntry.getCredibilityScore();
            articleEntry.getPreviewText();
            listofarticles.push(articleEntry);
        }
    });
}

function generateList() {
    // Collect values from the HTML

    //Sort by... Most Recent, Alphabetical, Credibility Score (High to Low & Low to High)
    var sortOptions = document.getElementById("sortByList");
    var sortBy = sortOptions.options[sortOptions.selectedIndex].value;
    var orderOptions = document.getElementById("order")
    var order = orderOptions.options[orderOptions.selectedIndex].value;
    search = document.getElementById("searchtext").value;

    //search
    var searchedArticles = unlimitedSearchWorks(search, listofarticles);

    //sort
    var sortedArticles = sortArticles(searchedArticles, sortBy, order);
    //Filter by tags (Needs additional information)

    //Only show the top X results
    var showLimit = Math.max(sortedArticles.length, document.getElementById("showLimit").value);
    sortedArticles = sortedArticles.slice(0, showLimit);
    document.getElementById("articleList").innerHTML = "";

    for (var i = 0; i < sortedArticles.length; i++) {
        generateEntry(sortedArticles[i]);
    }
    return false;
}

function unlimitedSearchWorks(query, listofarticles) {
    output = []
    var re = new RegExp(search, 'gi');
    for (var i = 0; i < listofarticles.length; i++) {
        if (listofarticles[i].title.match(re) != null) {
            output.push(listofarticles[i])
        }
    }
    return output
}

function sortArticles(listofarticles, sortBy, order) {
    if (sortBy == "title") {
        if (order == "revAlpha") {
            listofarticles.sort((a, b) => (a.title < b.title) ? 1 : -1)
        } else {
            listofarticles.sort((a, b) => (a.title > b.title) ? 1 : -1)
        }
    } else if (sortBy == "date") {
        if (order == "older") {
            listofarticles.sort((a, b) => (a.date > b.date) ? 1 : -1)
        } else {
            listofarticles.sort((a, b) => (a.date < b.date) ? 1 : -1)
        }
    } else {
        if (order == "high") {
            listofarticles.sort((a, b) => (a.credibilityScore < b.credibilityScore) ? 1 : -1)
        } else {
            listofarticles.sort((a, b) => (a.credibilityScore > b.credibilityScore) ? 1 : -1)
        }
    }
    return listofarticles;
}

function generateAndMove() {
    setTimeout(function () {
        generateList();

    }, 1000);
    setTimeout(function() {
        moveHallmarks();
    });
}

function generateEntry(entry) {
    var articleEntry = "<div id='" + entry.id + "' class='row'>" +
                            "<div class='col-2 date'>" + entry.date + "</div>" +
                            "<div class='col-6'>" +
                                "<a class='hyperlink' href='" + entry.visLink + "'> <h3>" + entry.title + "</h3></a>" +
                                "<p class='articleText'>" + entry.previewText + "</p>" +
                                "<p class='author'>" + entry.author + "</p>" +
                            "</div>" +
                            "<div class='cred-score-container col-4'>" +
                                "<div class='sunburst'>" +
                                    "<svg id='sunburst" + entry.id + "' viewBox='0 0 200 200'  preserveAspectRatio='xMidYMid meet'></svg>" +
                                "</div>" +
                            "</div>" +
                       "</div>" +
                       "<hr>";
    document.getElementById("articleList").innerHTML += articleEntry;
    if (document.querySelector("svg[articleID='" + entry.id +"']") != null) {
        document.querySelector("svg[articleID='" + entry.id +"']").remove();
    }
    hallmark("https://cors-anywhere.herokuapp.com/" + entry.highlightData, entry.id);
}

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  //return result; //JavaScript object
  return result
}
