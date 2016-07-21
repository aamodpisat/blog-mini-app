/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog'),
    moment = require('moment');
module.exports = function (app) {
    app.use(function(req, res, next) {
        var limit= req.limit = 5;
        var page = parseInt(req.query.page);
        var skip = (page) ? (page * limit) - limit : 0;
        req.options = {
            'skip' : skip ,
            'limit': limit
        };
        /*
         * Pagination
         */
        var pagination = {
            'nextUrl' : function() {
                return (req.query.page) ? '?page=' + (page + 1) : '?page=' + 2;
            },
            'prevUrl': function() {
                if(req.query.page && req.query.page >= 2) {
                    return '?page=' + (page - 1);
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
        app.locals.date= function(value) {
            return moment(value).format('Do MMMM YYYY');
        };
        next();
    });
};