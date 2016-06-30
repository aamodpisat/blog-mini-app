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
                        var data= {};
                        data['posts'] = entries;
                        res.send(data);
                }, function fail(err) {
                        res.send("Something went wrong");
                    });
            });
    };
};