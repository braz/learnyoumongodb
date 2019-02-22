module.exports = function () {
  var async = require('async');

  var server = 'mongodb://127.0.0.1:27017/mydatabase';
  var collectionname = 'zips';
  var MongoClient = require('mongodb').MongoClient 
      , format = require('util').format;

  async.series([
      // Setup for the exercise by ensuring there is no existing data
      function(callback) {
        MongoClient.connect(server, function(err, db) {
          if (err) return callback(err);

          db.dropCollection(collectionname, function(err, result) {
            if (err) return callback(err);
            db.close(function(err, result) {
              if (err) return callback(err);
            }); //db.close      
          }); //db.dropCollection
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
