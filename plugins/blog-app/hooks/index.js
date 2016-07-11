/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app) {
    /*
     * To add data model to your routes
     */
    app.use('/blog', function(req, res, next) {
        var options= {};
        req.response = function() {
            req.entries = req.entries || {};
            return {
                'setData' : function(key, value) {
                    if(typeof key == 'string') {
                        req.entries[key] = value;
                    }else {
                        console.log("Key must be in string");
                    }
                },
                'getData' : function(key) {
                    if(typeof key == "string") {
                        return req.entries[key];
                    }
                }
            }
        };
        Blog.getCategories(options)
            .spread(function success(entries) {
                req.response().setData("categories", entries);
            });
        Blog.getAuthors(options)
            .spread(function success(entries) {
                req.response().setData("authors", entries);
                next();
            });
    });

};