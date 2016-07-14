/*!
 * blog
 */
"use strict";
/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    _ = require('lodash');
module.exports = function BlogApp() {
    var options = BlogApp.options,
        baseRoute =  options.baseRoute || '/';
    BlogApp.serverExtends = function(app) {
        require('./hooks/index')(app, baseRoute); //Hooks
        app.use(baseRoute, require('./routes/home')); // Home Route
        app.use(baseRoute, require('./routes/category')); // Category route
        app.use(baseRoute, require('./routes/author')); // Author Route
        app.use(baseRoute, require('./routes/tag')); // Tag Route
        app.use(function(req, res, next) {
            var result = {};
            result = _.merge(req.data, req.entry);
            res.send(result);
        });
    };
};