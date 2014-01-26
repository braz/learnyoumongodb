var server = 'mongodb://127.0.0.1:27017/mydatabase';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var filesCollection = 'fs.files';
var async = require('async');
var fs = require('fs');
var path = require('path');
var request = require('request');
var mongodb_media_url = 'http://media.mongodb.org/';
var mongodb_logo_filename = 'logo-mongodb.png';
var ObjectID = require('mongodb').ObjectID;
var GridStore = require('mongodb').GridStore;

// Part of checking that it is indeed same file is to download separately and md5 hash it then check against stored hash in DB
var crypto = require('crypto');
var algo = 'md5';
var shasum = crypto.createHash(algo);
var filemd5;

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

        db.collectionNames(databasedoc.name).toArray(function(err, collectionslistfordb) {
			if (err) callback(err);

			var collectionnames_to_find = ['fs.files','fs.chunks'];
			var valid_gridfs_on_db = us.intersection(collectionslistfordb, collectionnames_to_find);

			if (us.difference(valid_gridfs_on_db, collectionnames_to_find).length == 0) {

					var authormetadata = {"metadata":{"author": "MongoDB Inc."}};
					var collection = db.collection(filesCollection);

					try {
			    		var fd = fs.openSync(path.join(__dirname, mongodb_logo_filename),'r+');
			    		var filecontents = fs.readFileSync(path.join(__dirname, mongodb_logo_filename));
			    		shasum.update(filecontents);
						filemd5 = shasum.digest('hex');
						fs.closeSync(fd);
					}
					catch (error) {
						callback(error);
					}


			        collection.findOne({authormetadata}, function(err, result) {
			            if (err) callback(err);

			            if ( result.md5 != filemd5 ) {
			            	var error = new Error ("Different MD5 hashes between file on disk and record in GridFS DB.")
			            	callback(error);
			            }

			            console.log(result);

			            db.close(function(err, result) {
              				if (err) callback(err.message);
              			}); //db.close
		                callback(null);
			        }); // update

        	}
        	else {
				var error = new Error("This problem requires you to have stored a file in GridFS using the collections " + collectionnames_to_find + ".");
				db.close();
				callback(error);
			}
			callback(null);
		});
	},
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });
}); // connect
