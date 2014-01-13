module.exports = function (dbstr, age, callback) {
  var agesequaltoorabove = 0
  
  var server = dbstr;
    
  var MongoClient = require('mongodb').MongoClient 
    , format = require('util').format;
    
  MongoClient.connect(server, function(err, db) {  
    if (err) {
      console.warn(err.message);
      return;
    }

  var stream = collection.find("age":{$gte:age}).stream()
  stream.on('error', function (err) {
    if (callback) {
      callback(err)
      callback = null
    }
  })
  stream.on('data', function(err) {
    agesequaltoorabove++
  })
  stream.on('end', function() {
    if (callback) {
      callback(null, agesequaltoorabove)
      callback = null
    }
  })
  })
  return {
      args   : []
     , stdin : null
     , long  : true
   }
}