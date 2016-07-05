/**
 * Created by Aamod Pisat on 04-07-2016.
 */
module.exports = function (app , Blog) {
    app.use('/', function (req, res, next) {
        var options= {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                next();
            });
    });
};