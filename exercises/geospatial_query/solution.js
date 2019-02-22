var server = 'mongodb://127.0.0.1:27017/mydatabase';
var databasename = 'mydatabase';
var collectionname = 'zips';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var async = require('async');
var us = require('underscore');

// The sleep module and call are used to delay the execution of the solution script to ensure
// it does not check for the existing of the DB created by your program before it has a chance
// to create the database. A lock file or other approach will be used in future.
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

	    // Get and then check to ensure the correct index is present
		collection.indexInformation(function(err, indexitems) {
			if (err) callback(err);

			var index_field_required = ['loc', '2d'];
			var values = us.values(indexitems);
			var flattened = us.flatten(values);
			var cleaned = us.without(flattened, "_id", 1);
			var valid_index = us.intersection(cleaned, index_field_required);
			
			if (valid_index.length == index_field_required.length) {
				
				var location_of_interest = [ -122.21, 37.78];
				collection.find({'loc': {$near : location_of_interest } }).limit(3).toArray(function(err, result) {
		            if (err) callback(err);

		            console.log(result);
		        	db.close(function(err, result) {
		          		if (err) callback(err);
		            }); //db.close
		        }); // first query with explain
				callback(null);
			}
			else {
				var error = new Error("This problem requires you to create a geospatial index on the collection " + collectionname + ".");
				db.close(function(err, result) {
		          		if (err) callback(err);
		        }); //db.close
				callback(error);
			}
		}); // indexInformation()
	},
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });
}); // connect
