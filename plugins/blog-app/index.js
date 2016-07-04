/*!
 * blog
 */

"use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express'),
    Blog = require('./models/blog'),
    Homepage = require('./routes/homepage'),
    Category = require('./routes/category'),
    Author = require('./routes/author'),
    Tag = require('./routes/tag');
module.exports = function BlogApp() {
    BlogApp.serverExtends = function(app) {
        Homepage(app);      // Homepage Route
        Category(app); // Category Route
        Author(app);   // Author Route
        Tag(app);     // Tag Route
    };
};