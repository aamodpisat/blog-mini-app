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
        baseRoute =  options.baseRoute || '/',
        viewBasePath = options.viewBasePath;
    BlogApp.serverExtends = function(app) {
        require('./hooks/index')(app, baseRoute); //Hooks
        app.use(baseRoute, require('./routes/home')); // Home Route
        app.use(baseRoute, require('./routes/category')); // Category route
        app.use(baseRoute, require('./routes/author')); // Author Route
        app.use(baseRoute, require('./routes/tag')); // Tag Route
        app.use(function(req, res, next) {
            var result = {};
            result = _.merge(req.contentstack.get('entry'), req.entry);
            if(viewBasePath) {
                if(req.route.path == '/') res.render(viewBasePath + 'home.html', result);
                if(req.route.path == '/category/:category') res.render(viewBasePath + 'category.html', result);
                if(req.route.path == '/author/:author') res.render(viewBasePath + 'author.html', result);
                if(req.route.path == '/tag/:tag') res.render(viewBasePath + 'author.html', result);
            } else {
                res.send(result);
            }
        });
    };
};