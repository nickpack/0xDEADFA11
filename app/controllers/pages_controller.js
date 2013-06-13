var locomotive = require('locomotive'),
    request = require('request'),
    async = require('async'),
    CachedPayload = require('../models/cachedpayload');

var PagesController = new locomotive.Controller();

PagesController.main = function () {
    var controller = this;
    controller.title = 'Hi, I\'m Nick...';
    controller.user = controller.req.user;

    var apiUrl = 'https://api.github.com/users/nickpack/repos?sort=pushed';

    var d = new Date();

    CachedPayload.find({
        url: apiUrl,
        date: {
            $gte: d.setDate(d.getDate() - 1)
        }
    }).sort({date: -1}).limit(1).execFind(function (err, payload) {
        if (err) {
            controller.res.send(500);
        } else {
            if (payload.length < 1) {
                console.log('Fresh as fuck');
                request({ uri: apiUrl, headers: {'User-Agent': '0xDEADFA11.net'} }, function (err, resp, body) {
                    if (resp.statusCode === 404) {
                        controller.res.send(404);
                    }
                    CachedPayload.savePayload(apiUrl, body, function (err, body) {
                        if (err) {
                            controller.error(err);
                        }
                    });

                    if (err) {
                        controller.send(err);
                        return;
                    }
                    controller.projects = JSON.parse(body);
                    controller.render();
                });
            } else {
                console.log('From cache');

                controller.projects = JSON.parse(payload[0].payload);
                controller.render();
            }
        }
    });
};

module.exports = PagesController;
