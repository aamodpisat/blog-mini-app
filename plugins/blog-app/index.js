/*!
 * blog
 */
"use strict";
/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Blog= require('./models/blog'),
    Hooks = require('./hooks/index'),
    Home = require('./routes/home'),
    Category = require('./routes/category'),
    Author = require('./routes/author'),
    Tag = require('./routes/tag');
module.exports = function BlogApp() {
    var options = BlogApp.options,
        baseRoute =  options.baseRoute || '/';
    BlogApp.serverExtends = function(app) {
        Hooks(app, Blog); // To attach data model with routes
        app.use(baseRoute,Home); // Home Route
        app.use(baseRoute,Category); // Category route
        app.use(baseRoute,Author); // Author Route
        app.use(baseRoute,Tag); // Tag Route
    };
};