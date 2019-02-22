module.exports = function () {
  var async = require('async');

  var server = 'mongodb://127.0.0.1:27017/mydatabase';
  var filescollectionname = 'fs.files';
  var chunkscollectionname = 'fs.chunks';
  var MongoClient = require('mongodb').MongoClient 
      , format = require('util').format;

  async.series([
      // Setup for the exercise by ensuring there is no existing data
      function(callback) {
        MongoClient.connect(server, function(err, db) {
          if (err) return callback(err);

          db.dropCollection(filescollectionname, function(err, result) {
            if (err) return callback(err);

            db.dropCollection(chunkscollectionname, function(err, result) {
              if (err) return callback(err);

              db.close(function(err, result) {
                if (err) return callback(err);
              }); //db.close      
            }); // db.dropCollection - chunks
          }); //db.dropCollection - files
      }); // MongoClient.connect
      callback(null);
    } // callback
  ],
  // callback and error handling
  function(err, results) {
    if (err && err.message != "ns not found") console.warn(err.message);
  });

  return { args: [], stdin: null }
}
