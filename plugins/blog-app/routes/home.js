/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog'),
    option = {};
Router.get('/', function(req, res) {
    var skip = parseInt(req.query.skip) || 0;
    var limit= parseInt(req.query.limit) || 5;
    var options = {
       'skip' : skip,
       'limit': limit
   };
    Blog.getRecentPosts(options)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            if(option.viewBasePath){
                res.render(option.viewBasePath + 'home.html', data);
            }else {
                res.send(data);
            }
        }, function fail(err) {
            res.send("Something went wrong");
        });
});
module.exports = function(opts) {
    option = opts;
    return Router;
};
