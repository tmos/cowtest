'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, dbName) {
  var db = mongojs('127.0.0.1:27017/' + dbName, [url]);
  var collection = db.exampleorg;
  var crawler = new SimpleCrawler(url);
  var pages = [];

  crawler.on('crawlstart', function () {});

  crawler.on('fetchcomplete', function (queueItem) {
    pages.push(queueItem);
  });

  crawler.on('complete', function () {
    collection.insert(pages);
  });

  crawler.start();
};

var SimpleCrawler = require('simplecrawler');
var mongojs = require('mongojs');