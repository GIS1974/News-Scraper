// Require scrape and date scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Require mongoose models
var Headline = require("../models/Headline");
// var Note = require("../models/Note");

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { ordered: false }, function (err, data) {
                cb(err, docs)
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function (query, cb) {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}