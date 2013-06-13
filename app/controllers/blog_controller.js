var locomotive = require('locomotive'),
    request = require('request'),
    async = require('async'),
    CachedPayload = require('../models/cachedpayload'),
    article_model = require('../models/article');

var BlogController = new locomotive.Controller();

BlogController.main = function () {
    var controller = this;

    controller.title = 'Blog';
    controller.render();
};

BlogController.viewArticle = function () {
    var controller = this;
};

BlogController.archive = function () {

};

module.exports = BlogController;