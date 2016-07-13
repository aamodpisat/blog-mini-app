/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app, baseRoute) {
    /*
     * To add data model to All routes
     */
    app.use('*', function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("categories", entries);
                next();
            });
    });
    /*
     * To add data model to your Homepage route
     */
    app.use(baseRoute, function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("category", entries);
                next();
            });
    });
    /*
     * To add data model to your Category route
     */
    app.use(baseRoute + '/category/:category', function(req, res, next) {
        var options = {};
        Blog.getAuthors(options)
            .spread(function success(entries) {
                req.getViewContext().set("authors", entries);
                next();
            });
    });
    /*
     * To add data model to your Author route
     */
    app.use(baseRoute + '/author/:author', function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("category", entries);
                next();
            });
    });
};