/**
 * Created by Boman on 2016-01-27.
 */

var allsets = require('./AllSets.json');
var request = require('request')
var parser = require('JSONStream').parse('rows.*.doc')
var options = { db: 'mongodb://localhost:27017/', collection: 'cards' }
var streamToMongo = require('stream-to-mongo')(options);

request(allsets)
    .pipe(parser)
    .pipe(streamToMongo);