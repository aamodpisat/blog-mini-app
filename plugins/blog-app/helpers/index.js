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
                return '?skip=' + skip + '&limit=' + limit;
            } else {
                limit = 5;
                return '?skip=' + limit + '&limit=' + limit ;
            }
        };
        app.locals.previous = function() {
            if(req.query.skip || req.query.limit) {
                var skip = parseInt(req.query.skip) - parseInt(req.query.limit),
                    limit = parseInt(req.query.limit);
                if(skip <= 0 ) {
                    return baseRoute;
                } else {
                    return '?skip=' + skip + '&limit=' + limit;
                }
            } else {
                return false;
            }
        };
        next();
    });
};