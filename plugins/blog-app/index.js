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
        app.extends().use(function(req, res, next) {
            var result = {};
            result = _.merge(req.contentstack.get('entry'), req.entry);
            if(viewBasePath && typeof viewBasePath == 'string') {
                if(req.route) {
                    if (req.route.path == '/')  res.render('pages/blog_landing_page/index.html', result);
                    if (req.route.path == '/category/:category') res.render('pages/category/index.html', result);
                    if (req.route.path == '/author/:author') res.render('pages/authors/index.html', result);
                    //if (req.route.path == '/tag/:tag') res.render(viewBasePath + 'tag.html', result);
                } else {
                   next();
                }
            } else {
                res.send(result);
            }
        });
    };
};