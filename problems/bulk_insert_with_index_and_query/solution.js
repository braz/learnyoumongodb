var server = 'mongodb://127.0.0.1:27017/mydatabase';
var databasename = 'mydatabase';
var collectionname = 'zips';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var async = require('async');
var us = require('underscore');

var sleep = require('sleep');
sleep.sleep(1);

MongoClient.connect(server, function(err, db) {
    if (err) {
        console.warn(err.message);
        return;
    }
 	async.series([
    // Deterime if the specified database exits
	function(callback) {
	    var collection = db.collection(collectionname);

		collection.indexInformation(function(err, indexitems) {
			if (err) callback(err);

			var index_field_required = ['pop', 'state', 'city'];
			var values = us.values(indexitems);
			var flattened = us.flatten(values);
			var cleaned = us.without(flattened, "_id", 1);
			var valid_index = us.intersection(cleaned, index_field_required);
			
			if (valid_index.length == index_field_required.length) {
				collection.find({state: "CA", pop: { $gt: 75000 }}).sort({pop:1, state:1, city:1}).toArray(function(err, result) {
		            if (err) callback(err);

		            console.log(result);
		        	db.close(function(err, result) {
		          		if (err) callback(err);
		            }); //db.close
		        }); // first query with explain
				callback(null);
			}
			else {
				console.log("This problem requires you to create an index on the collection " + collectionname + " for the fields " + index_key_items.toString() + ".");
				db.close(function(err, result) {
		          		if (err) callback(err);
		        }); //db.close
				callback(null);
			}
		}); // indexInformation()
	},
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });
}); // connect
