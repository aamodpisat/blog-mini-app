/**
 * Created by Aamod Pisat on 04-07-2016.
 */
module.exports = function (app) {
    app.use(function(req, res, next) {
        app.locals.next = function () {
            var skip, limit;
            if(req.query.skip && req.query.limit) {
                skip = parseInt(req.query.skip) + parseInt(req.query.limit);
                limit = parseInt(req.query.limit);
                return '?skip=' + skip + '&limit=' + limit;
            } else {
                limit = 5;
                return '?skip=' + limit + '&limit=' + limit ;
            }
        };
        app.locals.previous = function () {
            if(req.query.skip && req.query.limit) {
                var skip = parseInt(req.query.skip) - parseInt(req.query.limit),
                    limit = parseInt(req.query.limit);
                return '?skip=' + skip + '&limit=' + limit;
            } else {
                return false;
            }
        };
        next();
    });
};