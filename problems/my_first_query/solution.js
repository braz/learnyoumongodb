var MongoClient = require('mongodb').MongoClient 
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) console.warn(err.message);

    var collection = db
      .collection('test')
      .find({})
      .sort({'value': '1'})
      .toArray(function(err, object) {
        console.dir(object);
    });

});