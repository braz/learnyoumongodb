module.exports = function () {
  const userdetailsdoc  = require('../../data/user.json');
  var us = require('underscore');
  var async = require('async');

  // Global definition for variables
  var youngest_age;
  var oldest_age;
  var random_age_in_range;
  var random_age_data;

  var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
  var collectionname = 'userdetails';
  var MongoClient = require('mongodb').MongoClient 
      , format = require('util').format;
  var seek_this_age_or_older = "older_than_or_equal_to_years";

  async.series([
      // Read the file 'userdetails' JSON document and then
      // ... get a random age from the available range in the userdetails / results
      function(callback) {
        var err = null;
        youngest_age = us.chain(userdetailsdoc)
          .sortBy(function(userdetailsdoc){ return userdetailsdoc.age; })
          .map(function(userdetailsdoc){ return userdetailsdoc.age;})
          .first()
          .value();

          oldest_age = us.chain(userdetailsdoc)
              .sortBy(function(userdetailsdoc){ return userdetailsdoc.age; })
              .map(function(userdetailsdoc){ return userdetailsdoc.age;})
              .last()
              .value();

          random_age_in_range = us.random(parseInt(youngest_age), parseInt(oldest_age));
          random_age_data = { seek_this_age_or_older : random_age_in_range };
      },
      // Taking the earlier data that was stored into global variables, then add it to
      // ... the database so we can run the exercise
      function(callback) {
        MongoClient.connect(server, function(err, db) {
          if (err) return callback(err);
        
        db.createCollection(collectionname, {strict:true}, function(err, collection) {
            //if (err) console.warn(err.message); // assume collection exists and log to console, without error it'll be created straight
                
              db.collection(collectionname).remove( function(err) {
                if (err) return callback(err);
                  
                db.collection(collectionname).insert(userdetailsdoc, {w:1, fsync:true}, function(err, result) {
                      if (err) return callback(err);              

                    db.collection(collectionname).insert(random_age_data, {w:1, fsync:true}, function(err, result) {
                      if (err) return callback(err);

                db.close(function(err, result) {
                  if (err) return callback(err);
                }); //db.close      
                      }); // db.insert 2  
                  }); // db.insert 1
              }); //db.remove
          }); //db.createCollection
      }); // MongoClient.connect
    } // callback
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });

  return { args: [], stdin: null }
}
