module.exports = function () {
  var us = require('underscore');
  var async = require('async');
  const userdetailsdoc  = require('../../data/user2.json');

  // Global definition for variables
  var youngest_age;
  var oldest_age;
  var random_age_in_range;
  var random_age_data;

  var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
  var collectionname = 'userdetails';
  var MongoClient = require('mongodb').MongoClient 
      , format = require('util').format;
  //var query1age = "older_than_or_equal_to_years";

  async.series([
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

                      db.close(function(err, result) {
                        if (err) return callback(err);
                      }); //db.close      

                    //db.collection(collectionname).insert(random_age_data, {w:1, fsync:true}, function(err, result) {
                    //  if (err) return callback(err);
                    //  }); // db.insert 2  
                  }); // db.insert 1
              }); //db.remove
          }); //db.createCollection
      }); // MongoClient.connect
      callback(null);
    } // callback
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });

  return { args: [], stdin: null }
}
