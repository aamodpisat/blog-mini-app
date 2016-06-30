/*!
 * blog
 */

"use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Blog = require('./blog');
module.exports = function BlogApp() {
    BlogApp.serverExtends = function(app) {
        app.get("/blog", function(req, res, next) {
                var options = {
                    'skip':0,
                    'limit':5
                };
                Blog.getPosts(options)
                    .spread(function success(entries) {
                    if (entries.length > 0) {
                        var data= {};
                        data['post'] = entries;
                        res.send(data);
                    }else{
                        res.send("No results found");
                    }
                });
            });
    };
};