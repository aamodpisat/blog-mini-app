/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog'),
    options = {};
Router.get('/tag/:tag', function(req, res) {
    var tag = req.params.tag;
    Blog.getPostsByTag(tag)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            if(options.viewBasePath){
                res.render(options.viewBasePath + 'tag.html', data);
            } else {
                res.send(data);
            }
        }, function fail(err) {
            res.send("Something went wrong")
        });
});
module.exports = function(opts) {
    options = opts;
    return Router;
};