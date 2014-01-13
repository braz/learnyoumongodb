module.exports = function () {
  var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
  var collectionname = 'userdetails';

  var MongoClient = require('mongodb').MongoClient 
    , format = require('util').format;
    
    MongoClient.connect(server, function(err, db) {
    if (err) console.warn(err.message);

      db.createCollection(collectionname, function(err, collection) {
        if (err) console.warn(err.message);
      });

      db.collection(collectionname).remove( function(err) {
        if (err) console.warn(err.message);
      });

      var fs = require('fs');
      var userdetailsfile = 'user.json';
      //console.log("Attempting to read file");
      
      fs.exists(userdetailsfile, function(exists) {
        if (exists) {

          fs.readFile(userdetailsfile, 'utf8', function (err, data) {
            if (err) console.warn(err.message);

            data = JSON.parse(data);
            //console.log("Attempting to insert to DB");

            db.collection(collectionname).insert(data, {w:1, fsync:true}, function(err, result) {
              if (err) console.warn(err.message);
              if (err && err.message.indexOf('E11000 ') !== -1) {
              // this _id was already inserted into the database
              }
              
              //console.log("Inserted to DB");
              //console.dir(data);
              
              db.close(function(err, result) {
              if (err) console.warn(err.message);
              }); //db.close

            }); // db.insert
          }); // fs.readFile
        } // if exists
      }); // fs.exists
    }); // MongoClient.connect

   return {
      args   : []
     , stdin : null
     , long  : true
   }
}