var server = 'mongodb://127.0.0.1:27017/mydatabase';
var databasename = 'mydatabase';
var collectionname = 'hackernews';
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

		collection.indexInformation(function(err, indexitems) {
			if (err) callback(err);

			var index_key_items = ['text'];
			var values = us.values(indexitems);
			var flattened = us.flatten(values);
			var cleaned = us.without(flattened, "_id", 1);
			var valid_index = us.intersection(cleaned, index_key_items);
			
			if (valid_index.length == index_key_items.length) {
				var searchstring = "ask hn";
				db.command({"text": collectionname, "search": searchstring}, function(err, searchresult) {
		    		if (err) callback(err);

		    		console.log(searchresult.results);
		    		db.close(function(err, result) {
			            if (err) callback(err);
				    }); //db.close
				}); //db.command

				callback(null);
			}
			else {
				console.log("This problem requires you to create an index on the collection " + collectionname + " for the field " + index_key_items.toString() + ".");
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
