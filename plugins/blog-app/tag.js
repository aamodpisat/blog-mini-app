/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var Blog = require('./blog');
module.exports = function(app){
    app.get("/tag/:tag", function(req, res) {
        var tag = req.params.tag;
        Blog.getPostsByTag(tag)
            .spread(function success(entries) {
                var data= {};
                data['posts'] = entries;
                res.send(data);
            }, function fail(err) {
                res.send("Something went wrong")
            });
    });
};