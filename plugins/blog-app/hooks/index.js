/**
 * Created by Aamod Pisat on 04-07-2016.
 */
var Blog = require('./../models/blog');
module.exports = function(app) {
    /*
     * To add data model to your routes
     */
    app.use('/blog', function(req, res, next) {
        var options= {}, data= {};
        var data1 =  {
              'set' : function(key, value) {
                  if(typeof key== 'string') {
                      return req.getViewContext().set(key, value);
                  } else {
                      console.log("key must be in string");
                  }
              },
              'get' : function(key, value) {
                  if(typeof key == 'string') {
                      data1.set(key, value);
                      return req.getViewContext().get(key);
                  }
              }
        };
        Blog.getCategories(options)
            .spread(function success(entries) {
                data['categories'] =  data1.get('entries', entries);
                //console.log("===============", data1.get('entries', entries));
                next();
            });
    });
};