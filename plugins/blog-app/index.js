/*!
 * blog
 */
"use strict";
/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Home = require('./routes/home'),
    Category = require('./routes/category'),
    Author = require('./routes/author'),
    Tag = require('./routes/tag');
module.exports = function BlogApp() {
    var options = BlogApp.options,
        Routes = options.Routes,
        baseRoute =  Routes.baseRoute || '/';
    BlogApp.serverExtends = function(app) {
        var Hooks = require('./hooks/index')(app, Routes); //Hooks
        app.use(baseRoute, Home); // Home Route
        app.use(baseRoute, Category); // Category route
        app.use(baseRoute, Author); // Author Route
        app.use(baseRoute, Tag); // Tag Route
    };
};