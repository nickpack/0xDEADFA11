var mongoose = require('mongoose'),
    models = require('../../app/models');

module.exports = function () {
    var mongo = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/dev';
    mongoose.connect(mongo);
};