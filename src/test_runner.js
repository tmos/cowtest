const mongojs = require('mongojs');

export default function (url, dbName) {
  const db = mongojs(`127.0.0.1:27017/${dbName}`, [url]);
  const collection = db.exampleorg;

  const data = collection.find({ url });
  console.log(data);
}
