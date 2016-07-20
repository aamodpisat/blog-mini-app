/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog');
Router.get('/', function(req, res, next) {
    var skip = 0;
    var limit= 5;
    if(req.options) {
        skip = req.options.skip;
    }
    var options = {
       'skip' : skip,
       'limit': limit
   };
    Blog.getRecentPosts(options)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            req.contentstack.set('entry', data);
            next();
        }, function fail(err) {
            res.send("Something went wrong");
        });
});
module.exports = Router;
