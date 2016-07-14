/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog');
Router.get('/tag/:tag', function(req, res, next) {
    var tag = req.params.tag;
    Blog.getPostsByTag(tag)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            req.data = data || {};
            next();
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = Router;