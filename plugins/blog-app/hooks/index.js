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
                //var categories = entries;
                req.getViewContext().set("categories", entries);
                next();
            });
    });

};