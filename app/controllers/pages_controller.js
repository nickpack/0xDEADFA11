var locomotive = require('locomotive'),
    request = require('request'),
    async = require('async');

var PagesController = new locomotive.Controller();

PagesController.main = function () {
    var controller = this;
    async.parallel([
        function (cb) {
            request({ uri: 'https://api.github.com/orgs/Cohaesus/members', headers: {'User-Agent': 'Cohaesus-Labs'} }, function (err, resp, body) {
                if (resp.statusCode === 404) {
                    controller.res.send(404);
                }
                cb(null, JSON.parse(body));
            })
        },
        function (cb) {
            request({ uri: 'https://api.github.com/orgs/Cohaesus/repos', headers: {'User-Agent': 'Cohaesus-Labs'} }, function (err, resp, body) {
                if (resp.statusCode === 404) {
                    cb(null, '<p>No projects were found, our bad.</p>');
                }

                cb(null, JSON.parse(body));
            })
        }
    ],
    function (err, results) {
        if (err) {
            controller.send(err);
            return;
        }
        controller.title = 'Welcome.';
        controller.team = results[0];
        controller.projects = results[1].reverse();
        controller.user = controller.req.user;
        controller.render();
    });
};

module.exports = PagesController;
