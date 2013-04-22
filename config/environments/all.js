var express = require('express'),
    poweredBy = require('connect-powered-by'),
    util = require('util'),
    cons = require('consolidate'),
    swig = require('swig');

var mongoose = require('mongoose');

module.exports = function () {
    // Warn of version mismatch between global "lcm" binary and local installation
    // of Locomotive.
    if (this.version !== require('locomotive').version) {
        console.warn(
            util.format(
                'version mismatch between local (%s) and global (%s) Locomotive module',
                require('locomotive').version,
                this.version
            )
        );
    }

    this.datastore(require('locomotive-mongoose'));

    swig.init({
        root: __dirname + '/../../app/views',
        allowErrors: true
    });

    this.engine('swig', cons.swig);
    this.set('view engine', 'swig');
    this.set('views', __dirname + '/../../app/views');

    this.use(poweredBy('Hipster Shizzle'));
    this.use(express.logger());
    this.use(express.favicon());
    this.use(express.cookieParser());
    this.use(express.session({
        secret: '49UeW7KyXJO5L6nhCohaesusProjectsLtd6gkzKkl7d+nQ6Agr'
    }));
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.bodyParser());

    this.use(express.methodOverride());
    // @todo Tidy this up and put it in the development env
    this.use(function(req, res, next){
        var send = res.send;
        res.send = function (string) {
            var body = string instanceof Buffer ? string.toString() : string;
            body = body.replace(/<\/body>/, function (w) {
               var snippet = [
                  "<!-- livereload snippet -->",
                  "<script>document.write('<script src=\"http://'",
                  " + (location.host || 'localhost').split(':')[0]",
                  " + ':35729/livereload.js?snipver=1\"><\\/script>')",
                  "</script>",
                  ""
               ].join('\n');
               return snippet + w;
            });
            send.call(this, body);
        };
      next();
    });
    this.use(this.router);
};
