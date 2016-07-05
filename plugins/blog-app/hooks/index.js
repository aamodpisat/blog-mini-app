/**
 * Created by Aamod Pisat on 04-07-2016.
 */
module.exports = function (app , Blog) {
    /*
       To add data model to your routes
     */
    app.use('/', function (req, res, next) {
        var options= {};
        Blog.getCategories(options)
            .spread(function success(entries) {
                next();
            });
    });
};