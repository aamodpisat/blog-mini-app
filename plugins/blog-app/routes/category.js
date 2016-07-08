/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog');
Router.get('/category/:category', function(req, res) {
    var category = req.params.category;
    Blog.getPostsByCategory(category)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            res.send(data);
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = Router;