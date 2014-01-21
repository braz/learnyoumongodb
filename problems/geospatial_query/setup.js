module.exports = function () {
  var us = require('underscore');
  var async = require('async');

  var server = 'mongodb://127.0.0.1:27017/';
  var databasename = 'mydatabase';
  var collectionname = 'zips';
  var MongoClient = require('mongodb').MongoClient 
      , format = require('util').format;

  async.series([
      // Setup for the exercise by ensuring there is no existing data
      function(callback) {
        MongoClient.connect(server, function(err, db) {
          if (err) return callback(err);

          // Check for the specific database then proceed or exit and further checks for collection in the database
          db.command({listDatabases: 1 }, function(err, result) {
            if (err) callback(err);
            var databasedoc = us.find(result.databases, function(doc){ return doc.name == databasename; });
        
            if (databasedoc != null) {
              db.collectionsInfo(databasedoc.name).toArray(function(err, items) {
              if (err) callback(err);

                if (items == null)
                {
                  var error = new Error("This problem requires you to have loaded the collection called " + collectionname + ". Please refer to the bulk insert exercise for details on where this data comes from and how to import it.");
                  db.close();
                  callback(error);
                }

                callback(null);
              });
            }
            else {
              var error = new Error("This problem requires you to have the database called " + collectionname + " with zips information loaded. Please refer to the bulk insert exercise for details on where this data comes from and how to import it.");
              callback(error);
            }
          }); // db.command({listDatabases: 1 },
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
