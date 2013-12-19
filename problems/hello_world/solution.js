var MongoClient = require('mongodb').MongoClient 
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) {
      console.warn(err.message);
      return;
  }
  
  console.log("HELLO WORLD - WE ARE CONNECTED");

  db.close();
});