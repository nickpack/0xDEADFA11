var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: String,
    body: String,
    slug: String,
    date: { type: Date, default: Date.now },
    published: Boolean
});

articleSchema.statics.saveArticle = function (title, body, date, published) {
    var Model = this;
    var article = new Model({
        title: title,
        body: body,
        slug: title.replace(/\s/g,'-').replace(/[^a-zA-Z0-9\-]/g,''),
        date: date,
        published: published
    });
    article.save(function(error) {
      callback(error, article);
    });
};

module.exports = mongoose.connection.model('Article', articleSchema);