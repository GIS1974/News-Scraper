// Scrape script 
//==================

// Require request and cheerio for making scraping
// var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function(cb){
    axios.get("https://www.nytimes.com/section/us").then(function(err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".css-4jyr1y").each(function(i, element) {
            var head = $(this).children(".css-1dq8tca").text().trim();
            var sum = $(this).children(".css-1echdzn").text().trim();

            if(head && sum){
                headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;