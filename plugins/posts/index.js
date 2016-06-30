/*!
 * posts
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Stack = contentstack.Stack();

module.exports = function Posts() {

  
  Posts.templateExtends = function(engine) {
  };
  

  
  Posts.serverExtends = function(app) {
      app
          .extends()
          .get("/blog/*",function(req,res,next){
              var currentURL =req.originalUrl;

              var query_for_post = Stack.ContentType("post").Query();
              query_for_post
                  .toJSON()
                  .find()
                  .spread(function success(posts) {
                      posts.sort(sort);
                      var _post_length= posts.length,
                          next_value, prev_value;
                      for(var i=0;i< _post_length;i++){
                          if(currentURL == posts[i].url){
                              if(i == 0){
                                  prev_value = 0;
                                  next_value = posts[i+1].url
                              }
                              else if( i== _post_length - 1){
                                  prev_value = posts[i-1].url;
                                  next_value = 0;
                              }
                              else {
                                  prev_value = posts[i-1].url;
                                  next_value = posts[i+1].url;
                              }
                          }
                      }
                      var maindata = {
                          "previous" : prev_value,
                          "next": next_value
                      };

                      req.getViewContext().set("data", maindata);
                      next();
                  },function error(err){
                      console.log("Error--->",err.message);
                  });

          });

      function sort(a,b){
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
  };
  

  
  Posts.beforePublish = function (data, next) {
    next();
  };

  
  Posts.beforeUnpublish = function (data, next) {
    next();
  };
};