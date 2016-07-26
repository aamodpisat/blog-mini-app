/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog');
Router.get('/author/:author', function(req, res, next) {
    var author = req.params.author;
    Blog.getPostsByAuthor(author, req.options)
        .spread(function success(entries, count) {
            req.pages =  Math.ceil(count / req.limit);
            var data= {};
            data['posts'] = entries;
            data['author'] = entries[0].author[0];
            req.contentstack.set('entry', data);
            next();
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = Router;
