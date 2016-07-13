/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog'),
    options = {};
Router.get('/category/:category', function(req, res) {
    var category = req.params.category;
    Blog.getPostsByCategory(category)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            if(options.viewBasePath) {
                res.render(options.viewBasePath + 'category.html', data);
            }else {
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
