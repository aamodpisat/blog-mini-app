/*!
 * blog
 */
"use strict";
/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Blog = require('./models/blog'),
    _ = require('lodash');
module.exports = function BlogApp() {
    var options = BlogApp.options,
        baseRoute =  options.baseRoute || '/';
    BlogApp.serverExtends = function(app) {
        require('./hooks/index')(app, baseRoute); //Hooks
        require('./helpers/index')(app, baseRoute); //Helper
        app.use(baseRoute, require('./routes/home')); // Home Route
        app.use(baseRoute, require('./routes/category')); // Category route
        app.use(baseRoute, require('./routes/author')); // Author Route
        app.use(baseRoute, require('./routes/tag')); // Tag Route
        app.extends().use(function(req, res, next) {
            var result = {};
            result = _.merge(req.contentstack.get('entry'), req.entry);
                if(req.route) {
                    if (req.route.path == '/')  res.render('pages/blog_landing_page/index.html', result);
                    if (req.route.path == '/category/:category') res.render('pages/category/index.html', result);
                    if (req.route.path == '/author/:author') res.render('pages/authors/index.html', result);
                } else {
                    next();
                }
        });
        app.extends().use('/blog/*', function(req, res, next) {
            var entry =  req.contentstack.get('entry');
            if(entry){
                Blog.getNextPost(entry.created_at)
                    .spread(function success(nextEntry) {
                        if(nextEntry[0]) {
                            var next_post = {
                                'title': nextEntry[0].title,
                                'url': nextEntry[0].url
                            };
                            req.getViewContext().set('next_post', next_post);
                        }
                        Blog.getPreviousPost(entry.created_at)
                            .spread(function success(prevEntry) {
                                if(prevEntry[0]) {
                                    var prev_post = {
                                            'title': prevEntry[0].title,
                                            'url': prevEntry[0].url
                                        };
                                    //console.log("previous post", prev_post);
                                    req.getViewContext().set('prev_post', prev_post);
                                    next();
                                } else {
                                    next();
                                }
                            });
                    });
            } else {
                console.log("Some error");
            }
        });
    };
};