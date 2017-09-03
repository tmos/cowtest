import { MongoClient } from 'mongodb';

import { Crawler, TestRunner, Reporter } from './../';
import { seedUrl, collectionName } from './cowtestconf';

const dbString = 'mongodb://127.0.0.1:27017/cowtest';

console.log('=== Cowtest : START');

MongoClient.connect(dbString)
  .then(db => db.createCollection(collectionName))
  .then(collection => Crawler(collection, seedUrl))
  .then(collection => TestRunner(collection))
  .then(collection => Reporter(collection))
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
