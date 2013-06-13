var locomotive = require('locomotive'),
    marked = require("marked"),
    request = require('request'),
    async = require('async'),
    hljs = require('highlight.js'),
    CachedPayload = require('../models/cachedpayload');

// Concept Shamelessly borrowed from Koushik Dutta - https://github.com/koush/koush.com/blob/master/app.js

var ProjectsController = new locomotive.Controller();

ProjectsController.renderMarkdown = function (string, cb) {
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

ProjectsController.getProject = function () {
    var repo_name = this.param('name') || 'grunt-swig';
    var name = 'nickpack/' + repo_name;
    var controller = this;
    var d = new Date();

    CachedPayload.find({
        url: 'https://api.github.com/repos/' + name,
        date: {
            $gte: d.setDate(d.getDate() - 1)
        }
    }).sort({date: -1}).limit(1).execFind(function (err, payload) {
            if (err) {
                controller.res.send(500);
            } else {
                if (payload.length < 1) {
                    console.log('Fresh as fuck');
                    async.parallel([
                        function (cb) {
                            request({ uri: 'https://api.github.com/repos/' + name, headers: {'User-Agent': '0xDEADFA11.net'} }, function (err, resp, body) {
                                if (resp.statusCode === 404) {
                                    controller.res.send(404);
                                }
                                cb(null, body);
                            })
                        },
                        function (cb) {
                            request('https://raw.github.com/' + name + '/master/README.md', function (err, resp, body) {
                                if (resp.statusCode === 404) {
                                    cb(null, 'No README was found in the repo, my bad.');
                                } else {
                                    cb(null, body);
                                }
                            })
                        }
                    ],
                        function (err, results) {
                            if (err) {
                                controller.res.send(404);
                            }

                            var toCache = JSON.stringify({ repo: results[0], md: results[1] });

                            CachedPayload.savePayload('https://api.github.com/repos/' + name, toCache, function (err, results) {
                                if (err) {
                                    controller.error(err);
                                }
                            });
                            var info = results[0];
                            var md = results[1];
                            controller.render('github', {
                                title: repo_name,
                                markdown: controller.renderMarkdown(md),
                                project: {
                                    owner: info.owner,
                                    title: info.name,
                                    description: info.description
                                }
                            });
                        });
                } else {
                    console.log('From cache');
                    var results = JSON.parse(payload[0].payload);
                    var info = results.repo;
                    var md = results.md;
                    controller.render('github', {
                        title: repo_name,
                        markdown: controller.renderMarkdown(md),
                        project: {
                            owner: info.owner,
                            title: info.name,
                            description: info.description
                        }
                    });
                }
            }
        });
};

module.exports = ProjectsController;