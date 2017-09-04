import { MongoClient } from 'mongodb';

import { Crawler, TestRunner } from './../';
import { seedUrl, collectionName } from './cowtestconf';
import tests from './test1';

const dbString = 'mongodb://127.0.0.1:27017/cowtest';

console.log('\n=== START\n');

MongoClient.connect(dbString)
  .then(db => db.createCollection(collectionName))
  .then(collection => Crawler(collection, seedUrl))
  .then(collection => TestRunner(collection, tests))
  .then(() => {
    console.log('\n=== END\n');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
