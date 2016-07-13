/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    _ = require('lodash'),
    Blog = require('./../models/blog');
Router.get('/author/:author', function(req, res) {
    var author = req.params.author;
    Blog.getPostsByAuthor(author)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            _.merge(data, req.entry);
            res.send(data);
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = Router;
