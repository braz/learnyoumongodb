var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
var collectionname = 'userdetails';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var async = require('async');

MongoClient.connect(server, function(err, db) {
    if (err) {
        console.warn(err.message);
        return;
    }

  async.series([
    // Deterime if the specified file exits
      function(callback) {
        var collection = db.collection(collectionname);
        collection.createIndex({age:1}, {w:1}, function(err, indexName) {
            if (err) callback(err);
        });// createIndex 1
         collection.createIndex({firstname:1, lastname:1}, {w:1}, function(err, indexName) {
            if (err) callback(err);
        });// createIndex 2
        callback(null);
      },
    function(callback) {
        var collection = db.collection(collectionname);
        collection.find({age: { $gte: 25 }}).explain(function(err, explaination) {
            if (err) callback(err);
            console.log(explaination.scanAndOrder);
        }); // first query with explain
        callback(null);
      },
    function(callback) {
        var collection = db.collection(collectionname);
        collection.find({age: { $lte: 35 }}).sort({firstname:1, secondname:1}).explain(function(err, explaination) {
            if (err) callback(err);
            console.log(explaination.scanAndOrder);
        }); // second query with explain
        callback(null);
      },
    function(callback) {
        var collection = db.collection(collectionname);
        collection.find({firstname: "dominic"}).sort({firstname:1, secondname:1}).explain(function(err, explaination) {
            if (err) callback(err);
            console.log(explaination.scanAndOrder);
            db.close(function(err, result) {
                if (err) callback(err);
            }); // end close
        }); // third query with explain
        callback(null);
      }
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });
}); // connect