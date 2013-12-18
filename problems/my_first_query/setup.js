function setup (run, callback) {
	var ops = []
	  , i   = 5
	  , k

	while (i-- > 0) {
		k = Math.floor(Math.random() * (i == 1 ? 50 : 150))
		ops.push( { value: k} )
	}
    
    var MongoClient = require('mongodb').MongoClient 
  	  , format = require('util').format
    
    MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
	  if(err) throw err

		db.createCollection('test', function(err, collection) {
			if(err) throw err
		})

		db.collection('test').remove( function(err) {
			if(err) throw err
		})
	
		db.collection('test').insert(ops, {w:0}, function(err, result) {
			if(err) throw err
		})

      }
   )
}

module.exports			= setup
module.exports.async	= true