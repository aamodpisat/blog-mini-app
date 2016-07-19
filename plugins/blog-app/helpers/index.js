/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function (app, baseRoute) {
    app.use(function(req, res, next) {
        /*
         * Pagination
         */
        var pagination = {
            'nextUrl' : function() {
              var skip, limit;
              if(req.query.skip || req.query.limit) {
                  var skipInt = parseInt(req.query.skip) || 0;
                  limit = parseInt(req.query.limit) || 5;
                  skip = skipInt + limit;
                  return '?skip=' + skip;
              } else {
                  limit = 5;
                  return '?skip=' + limit;
              }
            },
            'prevUrl': function() {
                if(req.query.skip || req.query.limit) {
                    var limit = parseInt(req.query.limit) || 5;
                    var skip = parseInt(req.query.skip) - limit;
                    if(skip <= 0 ) {
                        return baseRoute;
                    } else {
                        return '?skip=' + skip;
                    }
                } else {
                    return false;
                }
            },
            'currentPage': function() {
                if(req.query.skip) {
                    return (req.query.skip / 5) + 1;
                } else {
                    return 1;
                }
            }
        };
        app.locals.next_url = pagination.nextUrl();
        app.locals.prev_url = pagination.prevUrl();
        app.locals.page = pagination.currentPage();
        /*
         * To get total number of pages;
         */
        var options ={};

        Blog.getRecentPosts(options)
            .spread(function success(entries, count) {
                app.locals.pages =  Math.ceil(count / 5);
                next();
            });

    });
};