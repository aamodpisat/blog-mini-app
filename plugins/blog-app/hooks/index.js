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
                var Category  = {
                    'setData': function(key) {
                        if(key) {
                            return req.getViewContext().set(key, entries);
                        }
                    },
                    'getData': function(key) {
                        if(key){
                            Category.setData(key);
                            return req.getViewContext().get(key)
                        }
                    }
                };
                req.categories = Category.getData("categories");
                next();
            });
        Blog.getAuthors(options)
            .spread(function success(entries) {

            });
    });

};