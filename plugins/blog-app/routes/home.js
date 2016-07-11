/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var contentstack = require('contentstack-express'),
    Router = contentstack.Router(),
    Blog = require('./../models/blog'),
    _ = require('lodash');
Router.get('/', function(req, res) {
   var skip = parseInt(req.query.skip) || 0;
   var limit= parseInt(req.query.limit) || 5;
    var options = {
       'skip' : skip ,
       'limit': limit
   };
    Blog.getPosts(options)
        .spread(function success(entries) {
            var data= {};
            data['posts'] = entries;
            _.merge(data, req.entries); // to merge the context data
            res.send(data);
        }, function fail(err) {
            res.send("Something went wrong");
        });
});
module.exports = Router;
