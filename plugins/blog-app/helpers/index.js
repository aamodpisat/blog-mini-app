/**
 * Created by Aamod Pisat on 04-07-2016.
 */
module.exports = function (app, baseRoute) {
    app.use(function(req, res, next) {
        app.locals.next = function() {
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
        };
        app.locals.previous = function() {
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
        };
        next();
    });
};