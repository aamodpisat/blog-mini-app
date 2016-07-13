/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    _ = require('lodash');
    Blog = require('./../models/blog');
Router.get('/tag/:tag', function(req, res) {
    var tag = req.params.tag;
    Blog.getPostsByTag(tag)
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