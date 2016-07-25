/**
 * Created by Aamod Pisat on 28-06-2016.
 */
var contentstack= require('contentstack-express');
var Stack = contentstack.Stack();

 var Blog = {
     _getPosts : function() {
         return Stack.ContentType("post").Query();
     },
     /*
      * To get the list of posts
      */
     getRecentPosts : function (options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         var postsQuery = this._getPosts();
         return postsQuery
             .descending('created_at')
             .includeCount()
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     /*
      * To get the next post
      */
     getNextPost: function (entryDateValue) {
         var postsQuery = this._getPosts();
         return postsQuery
             .descending('created_at')
             .lessThan('created_at', entryDateValue)
             .toJSON()
             .find()
     },
     /*
      * To get the previous post
      */
     getPreviousPost: function (entryDateValue) {
         var postsQuery = this._getPosts();
         return postsQuery
             .ascending('created_at')
             .greaterThan('created_at', entryDateValue)
             .toJSON()
             .find()
     },
     /*
      * To get the list of posts by Category
      */
     getPostsByCategory : function (category, options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         var postsQuery = this._getPosts();
         return postsQuery
             .where("category.title", category)
             .includeCount()
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     /*
      * To get the list of posts by Author
      */
     getPostsByAuthor : function (author, options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         var postsQuery = this._getPosts();
         return postsQuery
             .where("author.title", author)
             .includeCount()
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     /*
      * To get the list of posts by Tag
      */
     getPostsByTag : function (tag, options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         var postsQuery = this._getPosts();
         return postsQuery
             .where("tags", tag)
             .includeCount()
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     /*
      * To get the list of Category
      */
     getCategories : function (options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         return Stack.ContentType("category").Query()
             .skip(skip)
             .limit(limit)
             .includeCount()
             .toJSON()
             .find()
     },
     /*
      * To get the list of Authors
      */
     getAuthors : function (options) {
         var skip = options.skip || 0,
             limit = options.limit || 5;
         return Stack.ContentType("authors").Query()
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     /*
      * TODO : Fixing the list of blog page
      */
     getTags : function() {
         return {};
     }
 };
module.exports = Blog;
