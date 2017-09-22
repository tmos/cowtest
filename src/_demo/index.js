import { MongoClient } from 'mongodb';
import { Crawler, TestRunner, CowtestAvaConnector } from './../';
import conf from './cowtestconf';

const avaTest = `${__dirname}/avaTest.js`;
const dbString = 'mongodb://127.0.0.1:27017/cowtest';
const { seedUrl } = conf;

MongoClient.connect(dbString)
  .then(db => db.createCollection(seedUrl))
  .then((collection) => {
    collection.remove({});
    return collection;
  })
  .then(collection => Crawler(collection, seedUrl))
  .then(collection => TestRunner(collection, CowtestAvaConnector, avaTest))
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
