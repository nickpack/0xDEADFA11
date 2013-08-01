var locomotive = require('locomotive'),
    request = require('request'),
    async = require('async'),
    marked = require('marked'),
    hljs = require('highlight.js'),
    CachedPayload = require('../models/cachedpayload'),
    article_model = require('../models/article');

var BlogController = new locomotive.Controller();

BlogController.renderArticle = function (string, cb) {
    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        highlight: function (code, lang) {
            code = hljs.highlightAuto(code).value;
            return code;
        }
    });

    return marked(string);
};

BlogController.main = function () {
    var controller = this;

    controller.title = 'Blog';
    controller.render();
};

BlogController.viewArticle = function () {
    var controller = this;
    article_model.find({
        slug: this.param('slug')
    }).sort({date: -1}).limit(1).execFind(function (err, article) {
        if (err) {
            controller.res.send(500);
        } else {
            controller.render('article', {
                title: article.title,
                body: controller.renderArticle(article.body),
                posted: article.date,
                tags: article.tags
            });
        }
    });
};

BlogController.archive = function () {

};

module.exports = BlogController;