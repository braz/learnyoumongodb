var MongoClient = require('mongodb').MongoClient 
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) throw err;
  
  db.close();
});