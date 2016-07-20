/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog');
Router.get('/category/:category', function(req, res, next) {
    var category = req.params.category;
    Blog.getPostsByCategory(category, req.options)
        .spread(function success(entries, count) {
            req.pages =  Math.ceil(count / req.limit);
            var data= {};
            data['posts'] = entries;
            req.contentstack.set('entry', data);
            next();
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = Router;
