/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function (app, baseRoute) {
    app.use(function(req, res, next) {
        var page = parseInt(req.query.page);
        req.skip = (page) ? (page * 5) - 5 : 0;
        /*
         * Pagination
         */
        var pagination = {
            'nextUrl' : function() {
                return (req.query.page) ? '?page=' + (page + 1) : '?page=' + 2;
            },
            'prevUrl': function() {
                if(req.query.page) {
                    return (req.query.page <= 2 ) ? baseRoute : '?page=' + (page - 1);
                } else {
                    return false;
                }
            },
            'currentPage': function() {
                return (req.query.page) ? page: 1;
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