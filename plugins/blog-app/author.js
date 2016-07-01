/**
 * Created by Aamod Pisat on 01-07-2016.
 */
var Blog = require('./blog');
app.get("/author/:author", function(req, res) {
    var author = req.params.author;
    Blog.getPostsByCategory(author)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            res.send(data);
        }, function fail(err) {
            res.send("Something went wrong")
        });
});