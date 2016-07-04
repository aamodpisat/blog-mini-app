/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app) {
    app.get("/blog", function(req, res) {
        var options = {
            'skip':0,
            'limit':5
        };
        Blog.getPosts(options)
            .spread(function success(entries) {
                var data= {};
                data['posts'] = entries;
                res.send(data);
            }, function fail(err) {
                res.send("Something went wrong")
            });
    });
};