import { MongoClient } from 'mongodb';
import { Crawler, TestRunner } from './../';
import conf from './cowtestconf';
import booleanTest from './booleanTest';
import mochaTest from './mochaTest';

const dbString = 'mongodb://127.0.0.1:27017/cowtest';

const { seedUrl } = conf;

MongoClient.connect(dbString)
  .then(db => db.createCollection(seedUrl))
  .then((collection) => {
    collection.remove({});
    return collection;
  })
  .then(collection => Crawler(collection, seedUrl))
  .then(collection => TestRunner(collection, booleanTest))
  .then(collection => TestRunner(collection, mochaTest))
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
