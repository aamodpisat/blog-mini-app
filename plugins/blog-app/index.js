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
    BlogApp.serverExtends = function(app) {
        require('./hooks/index')(app, baseRoute); //Hooks
        app.use(baseRoute, require('./routes/home')); // Home Route
        app.use(baseRoute, require('./routes/category')); // Category route
        app.use(baseRoute, require('./routes/author')); // Author Route
        app.use(baseRoute, require('./routes/tag')); // Tag Route
    };
};