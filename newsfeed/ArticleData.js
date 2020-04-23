class ArticleData {
    constructor(title, author, date, ID, articleLink, visLink, plainText, highlightData) {
        this.title = title;
        this.author = author;
        this.date = date;
        this.id = ID;
        this.articleLink = articleLink;
        this.plainText = plainText;
        this.visLink = visLink;
        this.highlightData = highlightData;
        this.credibilityScore = 100;
        this.previewText = "";
    }

    getCredibilityScore() {
        var article = this;
        $.get("https://cors-anywhere.herokuapp.com/" + article.highlightData).done(function(data) {
            data = csvJSON(data);
            for (var i = 0; i < Object.keys(data).length - 1; i++) {
                var highlightEntry = data[i];
                article.credibilityScore += parseInt(highlightEntry["Points"]);
            }
        });
    }

    getPreviewText() {
        var article = this;
        $.get("https://cors-anywhere.herokuapp.com/" + article.plainText).done(function(data) {
            article.previewText = data.toString().substring(0, 200);
        });
    }
}