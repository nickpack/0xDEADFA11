var mongoose = require('mongoose');

var cachedPayloadSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    url: String,
    payload: String
});

cachedPayloadSchema.statics.savePayload = function (url, payload, callback) {
    var Model = this;
    var cachedPayload = new Model({
        url: url,
        payload: payload
    });
    cachedPayload.save(function(error) {
      callback(error, cachedPayload);
    });
};

module.exports = mongoose.connection.model('CachedPayload', cachedPayloadSchema);