var locomotive = require('locomotive'),
    marked = require("marked"),
    request = require('request'),
    async = require('async'),
    hljs = require('highlight.js');

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
    cb(null, marked(string));
};

ProjectsController.getProject = function () {
    var repo_name = this.param('name') || 'grunt-swig';
    var name = 'Cohaesus/' + repo_name;
    var controller = this;
    async.parallel([
        function (cb) {
            request('https://api.github.com/repos/' + name, function (err, resp, body) {
                if (resp.statusCode === 404) {
                    controller.res.send(404);
                }
                cb(null, JSON.parse(body));
            })
        },
        function (cb) {
            request('https://raw.github.com/' + name + '/master/README.md', function (err, resp, body) {
                if (resp.statusCode === 404) {
                    cb(null, '<p>No README was found in the repo, our bad.</p>');
                } else {
                   controller.renderMarkdown(body, cb);
                }
            })
        }
    ],
    function (err, results) {
        if (err) {
            controller.send(err);
            return;
        }

        var info = results[0];
        var md = results[1];
        controller.render('github', {
            title: repo_name,
            markdown: md,
            project: {
                owner: info.owner,
                title: info.name,
                description: info.description
            }
        });
    });
};

ProjectsController.main = function () {
    var controller = this;
    request('https://api.github.com/orgs/Cohaesus/repos', function (err, resp, body) {
        if (resp.statusCode === 404) {
            controller.res.send(404);
        }
        controller.title = 'Projects';
        controller.projects = JSON.parse(body);
        controller.user = this.req.user;
        controller.render();
    });

};

module.exports = ProjectsController;