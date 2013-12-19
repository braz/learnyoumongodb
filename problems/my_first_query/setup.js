module.exports = function () {
	var server = 'mongodb://127.0.0.1:27017/learnmymongodb'
	var ops = []
	  , i   = 5
	  , k

	while (i-- > 0) {
		k = Math.floor(Math.random() * (i == 1 ? 50 : 150))
		ops.push( { value: k} )
	}
    
    var MongoClient = require('mongodb').MongoClient 
  	  , format = require('util').format
    
    MongoClient.connect(server, function(err, db) {
	  if (err) throw err

		db.createCollection('test', function(err, collection) {
			if (err) throw err
		})

		db.collection('test').remove( function(err) {
			if (err) throw err
		})
	
		db.collection('test').insert(ops, {w:1, fsync:true}, function(err, result) {
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted into the database
			}
		})

		var assert = require('assert')
		// Close the connection with a callback that is optional
  		db.close(function(err, result) {
    		assert.equal(null, err)
  		})

      }
   )

   setTimeout(function () {}, 2)

   return {
   	  args   : []
   	 , stdin : null
   	 , long  : true
   }
}