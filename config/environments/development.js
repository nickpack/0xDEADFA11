var express = require('express'),
    swig = require('swig');

module.exports = function () {
    swig.init({
        root: __dirname + '/../../app/views',
        allowErrors: true,
        cache: false
    });

    this.use(express.errorHandler());
};