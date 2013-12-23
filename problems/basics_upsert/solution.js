var MongoClient = require('mongodb').MongoClient 
  , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) {
      console.warn(err.message);
      return;
  }

    var olddoc = {"Learning" : "MongoDB"};
    var upsertdoc = {"Learning":"NoSQL with MongoDB"};

    var collection = db
      .collection('test2')
      .update(olddoc, upsertdoc, {upsert:true, multi:true, w:1}, function(err, object) {
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
