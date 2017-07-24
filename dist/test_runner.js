'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, dbName) {
  var db = mongojs('127.0.0.1:27017/' + dbName, [url]);
  var collection = db.exampleorg;

  var data = collection.find({ url: url });
  console.log(data);
};

var mongojs = require('mongojs');