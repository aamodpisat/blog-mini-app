/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var Blog = require('./blog');
module.exports = function(app) {
    app.get("/category/:category", function(req, res) {
        console.log("True");
        var category = req.params.category;
        Blog.getPostsByCategory(category)
            .spread(function success(entries) {
                var data= {};
                data['posts'] = entries;
                res.send(data);
            }, function fail(err) {
                res.send("Something went wrong")
            });
    });
};