module.exports = function () {
  var server = 'mongodb://127.0.0.1:27017/learnmymongodb';
    
  var MongoClient = require('mongodb').MongoClient 
    , format = require('util').format;
    
  MongoClient.connect(server, function(err, db) {  
    if (err) {
      console.warn(err.message);
      return;
    }

    db.collection('test2', function(err, collection) {
        var stream = collection.find({"Learning":"MongoDB"}).stream();
        stream.on("data", function(item) {
          console.log(item); 
        });
        
        stream.on("end", function() {
          db.close(function(err, result) {
            if (err) console.warn(err.message);
          });
        });
      
      });
  });
   return {
   	  args   : []
   	 , stdin : null
   	 , long  : true
   }
}