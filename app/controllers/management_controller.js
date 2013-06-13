var locomotive = require('locomotive'),
    article_model = require('../models/article');

var ManagementController = new locomotive.Controller();

ManagementController.main = function () {
    var controller = this;

    controller.title = 'Management';
    controller.render();
};

ManagementController.articles = function () {
    this.articles = article_model.find({});
};

module.exports = ManagementController;
