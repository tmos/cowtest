import { MongoClient } from 'mongodb';
import { Crawler, TestRunner } from './../';
import { seedUrl, collectionName } from './cowtestconf';
import Sweetlog from '../../sweetlog';
import tests from './test1';

const dbString = 'mongodb://127.0.0.1:27017/cowtest';
const slog = new Sweetlog();
slog.info('=== START cowtest');

MongoClient.connect(dbString)
  .then(db => db.createCollection(collectionName))
  .then(collection => Crawler(collection, seedUrl))
  .then(collection => TestRunner(collection, tests))
  .then(() => {
    slog.info('=== END cowtest');
    process.exit(0);
  })
  .catch((err) => {
    slog.error(err);
    process.exit(1);
  });
