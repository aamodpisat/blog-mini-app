/*!
 * blog
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Stack = contentstack.Stack(),
    BlogsFunction = require('./blog');
module.exports = function Blog() {
  Blog.serverExtends = function(app) {
      app
          .extends()
          .get("/",function(req,res,next) {
              var skip=0, limit= 5;
              if (req.xhr) {
                  skip = parseInt(req.query.skip);
              }
              var options = {
                  'skip':skip,
                  'limit':limit
              };
              var query = BlogsFunction.getPosts(options);
                  query.spread(function success(entry){
                      if(entry.length > 0){
                          var data= {};
                          data['post'] = entry;
                          req.getViewContext().set("maindata",data);
                          next();
                      }else{
                          req.getViewContext().set("maindata",{'error':'No data found'});
                          next();
                      }
                  });
          });
  };
  Blog.beforePublish = function (data, next) {
    next();
  };
  Blog.beforeUnpublish = function (data, next) {
    next();
  };
};