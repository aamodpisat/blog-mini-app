/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog'),
    options = {};

Router.get('/author/:author', function(req, res) {
    var author = req.params.author;
    Blog.getPostsByAuthor(author)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            if(options.viewBasePath) {
                res.render(options.viewBasePath + 'author.html', data);
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
