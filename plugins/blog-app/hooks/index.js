/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app) {
    /*
     * To add data model to your routes
     */
    app.use('/', function(req, res, next) {
        var options= {};
        Blog.getCategories(options)
            .spread(function success(entries) {
               req.getCategoriesData = function(key) {
                 if(key && typeof key == 'string') {
                    req.getViewContext().set(key, entries);
                    return req.getViewContext().get(key);
                 } else {
                     console.log("Please specify key and it must be a string");
                 }
               };
            });
        Blog.getAuthors(options)
            .spread(function success(entries) {
                var getAuthorData = function(key) {
                    if(typeof key == 'string') {
                        req.getViewContext().set(key, entries);
                        return req.getViewContext().get(key);
                    } else {
                        console.log("Please specify key and it must be a string");
                    }
                };
                req.authors = getAuthorData("authors");
                next();
            });
    });
};