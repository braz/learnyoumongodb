var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
var collectionname = 'userdetails';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect(server, function(err, db) {
    if (err) {
        console.warn(err.message);
        return;
    }

    var age_or_greater_to_search_for = {"seek_this_age_or_older" : { $exists: true }};

    var collection = db.collection(collectionname);
    collection.find(age_or_greater_to_search_for).toArray( (function(err, item) {
        if (err) console.warn(err.message);
        query_age_doc = item[0];

        db.collection(collectionname).find({age: { $gte: query_age_doc.seek_this_age_or_older }}).count( function(err, number) {
            if (err) console.warn(err.message);
            console.log(number);
              db.close(function(err, result) {
                if (err) console.warn(err.message);
              }); // end close
        });
    }));
}) // connect