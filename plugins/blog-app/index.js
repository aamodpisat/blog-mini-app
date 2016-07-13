/*!
 * blog
 */
"use strict";
/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
module.exports = function BlogApp() {
    var options = BlogApp.options,
        baseRoute =  options.baseRoute || '/';
    var Home = require('./routes/home')(options),
        Category = require('./routes/category')(options),
        Author = require('./routes/author')(options),
        Tag = require('./routes/tag')(options);
    BlogApp.serverExtends = function(app) {
        var Hooks = require('./hooks/index')(app); //Hooks
        app.use(baseRoute, Home); // Home Route
        app.use(baseRoute, Category); // Category route
        app.use(baseRoute, Author); // Author Route
        app.use(baseRoute, Tag); // Tag Route
    };
};