import { MongoClient } from 'mongodb';

import configFile from './../cowtestconf';
import Crawler from './crawl';
import TestRunner from './testRunner';
// import Reporter from './reporter';

const { seedUrl, collectionName } = configFile;
const dbString = 'mongodb://127.0.0.1:27017/cowtest';

console.log('=== Cowtest : START');

MongoClient.connect(dbString)
  .then((db) => {
    console.log('=== Cowtest : DB CONNECTED');
    return db.createCollection(collectionName);
  })
  .then((collection) => {
    new Crawler()
      .crawl(collection, seedUrl);

    return collection;
  })
  .then((collection) => {
    new TestRunner()
      .init(collection);

    return collection;
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

