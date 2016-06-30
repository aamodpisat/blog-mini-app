/**
 * Created by Aamod Pisat on 28-06-2016.
 */
var contentstack= require('contentstack-express');
var Stack = contentstack.Stack();

 var blog = {
     //to get list of posts
     getPosts : function(options){
         var skip, limit;
         if(options){
           skip = options.skip;
           limit = options.limit;
         }else{
             skip = 0; limit = 5;
         }
         var posts_query =  Stack.ContentType("post").Query();
         return posts_query
             .descending('created_at')
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     //to get list of categories
     getCategories: function (options){
         var skip, limit;
         if(options){
             skip = options.skip;
             limit = options.limit;
         }else{
             skip = 0; limit = 5;
         }
         var category_query= Stack.ContentType("category").Query();
         return category_query
             .skip(skip)
             .limit(limit)
             .includeCount()
             .toJSON()
             .find()
     },
     //to get posts by category
     getPostsByCategory: function(category){
         var data = {};
         var category_regex= new RegExp(category,"i");
         var author_post_query = Stack.ContentType("post").Query();
         return author_post_query
             .regex("category.title",category_regex)
             .toJSON()
             .find()

     },
     //to get list of authors
     getAuthors: function(options){
         var skip, limit;
         if(options){
             skip = options.skip;
             limit = options.limit;
         }else{
             skip = 0; limit = 5;
         }
         var author_query = Stack.ContentType("authors").Query();
         author_query
             .skip(skip)
             .limit(limit)
             .toJSON()
             .find()
     },
     //to get list of posts by Author
     getPostsByAuthor: function(author){
         var data={};
         var author_regex= new RegExp(author,"i");
         var author_post_query = Stack.ContentType("post").Query();
         return author_post_query
             .regex("author.title",author_regex)
             .toJSON()
             .find()

     },
     //to get list of tags
     getTags: function(){
         var tag_query = Stack.ContentType("post").Query();
         return tag_query
             .toJSON()
             .find()

     },
     //To get list of posts by tag
     getPostsByTag : function(tag){
         var data={};
         var author_post_query = Stack.ContentType("post").Query();
         return author_post_query
             .where("tags",tag)
             .toJSON()
             .find()

     }
 };
module.exports = blog;
