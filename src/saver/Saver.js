/* import fs from 'fs';
import { MongoClient } from 'mongodb';

class Saver {
  constructor(
    method = 'json',
    dbName = 'cowtest',
    tableName = `cowtest_${new Date()}`,
    jsonPath = '~',
    mongoDbString = 'mongodb://127.0.0.1:27017/cowtest',
  ) {
    this.method = method;
    this.dbName = dbName;
    this.tableName = tableName;
    this.jsonPath = jsonPath;
    this.mongoDbString = mongoDbString;

    let res = this;

    switch (this.method) {
      case 'mongodb':
        MongoClient.connect(this.mongoDbString)
          .then(db => db.createCollection(this.mongoDbString))
          .then((collection) => {
            collection.remove({});
          });
        break;

      case 'json':
        fs.writeFile(jsonPath, '', (err) => {
          if (err) {
            res = new Error(`Cannot write on ${jsonPath}/${dbName}`);
          }
        });
        break;

      default:
        res = new Error('Saving method not specified');
        break;
    }

    return res;
  }

  save(data) {
    switch (this.method) {
      case 'mongodb':
        break;

      case 'json':
        fs.writeFile(`${this.jsonPath}/${this.dbName}`, JSON.parse(data), (err) => {
          if (err) {
            return new Error(`Cannot write on ${this.jsonPath}/${this.dbName}`);
          }

          return true;
        });

        break;

      default:
        throw new Error('Saving method not specified');
    }
  }

  get(data) {}

  edit(selector, newdata) {}
}
export default Saver;
*/
