var server = 'mongodb://127.0.0.1:27017/';
var databasename = 'mydatabase';
var collectionname = 'mycollection';
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
var async = require('async');

MongoClient.connect(server, function(err, db) {
    if (err) {
        console.warn(err.message);
        return;
    }
 async.series([
    // Deterime if the specified database exits
      function(callback) {
  	// Check for the specific database twice then proceed or exit and further checks for collection in the database
	  	db.command({listDatabases: 1 }, function(err, result) {
	      if (err) callback(err);
	      var databasedoc = us.find(result.databases, function(doc){ return doc.name == databasename; });
	      
	      if (databasedoc != null) 
	      {
	        db.collectionsInfo(databasedoc.name).toArray(function(err, items) {
				if (err) callback(err);

          		if (items == null)
				{
					console.warn("This problem requires you to create a collection called " + collectionname + ".");
					db.close();
				}
				callback(null);
			});
	      }
	      else
	      {
	        sleep.sleep(1);
	        db.command({listDatabases: 1 }, function(err, result) {
	          if (err) callback(err);

	          var databasedoc = us.find(result.databases, function(doc){ return doc.name == databasename; });
	          if (databasedoc != null) 
	          {
	            db.collectionsInfo(databasedoc.name).toArray(function(err, items) {
					if (err) callback(err);

          			if (items == null)
					{
						console.warn("This problem requires you to create a collection called " + collectionname + ".");
						db.close();
					}
					callback(null);
				});
	          }
	          else
	          {
	            console.warn("This problem requires you to create a database called " + databasename + ".");
	            db.close();
	            callback(null);
	          }
	        });
	      }
	  	});
        callback(null);
      },
      //
     function(callback) {

	 	var documents_to_insert = [{"name": "Daffy", "animal": "Duck"},{"name": "Donald", "animal": "Duck"},{"name": "Howard", "animal": "Duck"}];
    	var secondDb = db.db(collectionname);

        secondDb.insert(documents_to_insert, {w:1, fsync:true}, function(err, result) {
        if (err) return callback(err);              
            secondDb.findAndModify({name:"Howard"}, [['name', 1]], {$set:{name:"Howard the Duck"}}, {new:true, fields: {_id:0}}, function(err, doc) {
              if (err) return callback(err);

              if (doc != null)
              {
                console.log(doc);
              }
              db.close();
            }); // db.findAndModify
        }); // db.insert 1

        callback(null);
     },
  ],
  // callback and error handling
  function(err, results) {
    if (err) console.warn(err.message);
  });
}); // connect
