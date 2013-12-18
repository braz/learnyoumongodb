var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/learnmymongodb', function(err, db) {
  if(err) 
  	throw err
})

console.log("HELLO WORLD - WE ARE CONNECTED")
