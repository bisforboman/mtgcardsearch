/**
 * Created by Boman on 2016-01-27.
 */


/* stream to mongo syntax

var request = require('request')
var parser = require('JSONStream').parse('rows.*.doc')
var options = { db: 'mongodb://localhost:27017/', collection: 'cards' }
var streamToMongo = require('stream-to-mongo')(options);

request(allsets)
    .pipe(parser)
    .pipe(streamToMongo); */
/*
var Q 			= require('q'),
	database 	= require('./config/database'),
	FILENAME	= "AllSets.json";

module.exports = {
    getStatistics: function () {
        var deferred = Q.defer();

        var file = fs.createReadStream(__dirname + '/' + FILENAME);

        var req = http.request(database.url, function(res) {
          res.on('data', function(chunk) {
              file.write(chunk);
          });

          res.on('end', function () {
                deferred.resolve(FILENAME);
          })
        });

        req.on('error', function(err) {
            //if an error occurs reject the deferred
            console.log(err);
            deferred.reject(err);
        });

        req.end();

        return deferred.promise;
    }

}
*/

var mongo 		= require('mongodb'),
	database 	= require('../config/database'),
 	Grid 		= require('gridfs-stream'),
 	mongoose	= require('mongoose');

/* Ensure it's connected to mongodb. */
var conn = mongoose.createConnection(database.url);

conn.once('open', function() {
	var gfs = Grid(conn.db);
	// streaming from gridfs
	var readstream = gfs.createReadStream({
	  filename: 'AllSets.json'
	});

	readStream.on('data', function(data) {
		var json_obj = JSON.parse(data);
		console.log(json_obj);
	});

	//error handling, e.g. file does not exist
	readstream.on('error', function (err) {
	  console.log('An error occurred!', err);
	  throw err;
	});

	// ???? tydligen gott.
	readstream.pipe(response);
});


