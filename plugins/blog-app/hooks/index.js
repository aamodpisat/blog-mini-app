/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app, Routes) {
    /*
     * To add data model to All routes
     */
    app.use(Routes.All, function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("categories", entries);
            });
        Blog.getAuthors(options)
            .spread(function success(entries) {
                req.getViewContext().set("authors", entries);
                next();
            });
    });
    /*
     * To add data model to your Homepage route
     */
    app.use(Routes.baseRoute, function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("categories", entries);
            });
        Blog.getAuthors(options)
            .spread(function success(entries) {
                req.getViewContext().set("authors", entries);
                next();
            });
    });
    /*
     * To add data model to your Category route
     */
    app.use(Routes.CategoryPage, function(req, res, next) {
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
    app.use(Routes.AuthorPage, function(req, res, next) {
        var options = {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.getViewContext().set("categories", entries);
                next();
            });
    });
};