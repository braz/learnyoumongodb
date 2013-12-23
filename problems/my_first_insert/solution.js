var MongoClient = require('mongodb').MongoClient 
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) {
      console.warn(err.message);
      return;
  }

    var doc = {"Learning" : "MongoDB"};

    db.createCollection('test2', function(err, collection) {
      if (err) console.warn(err.message);
    })

    var collection = db
      .collection('test2')
      .insert(doc, {safe: true}, function(err, object) {
        if (err) console.warn(err.message);
    });

    db.collection('test2')
      .find(doc, {fields: {_id:0}})
      .toArray(function(err, object) {
        if (err) console.warn(err.message);
        console.dir(object);
        db.close(function(err, result) {
          if (err) console.warn(err.message);
        });
    });
});
