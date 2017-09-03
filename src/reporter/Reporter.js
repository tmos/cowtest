/**
 *
 */

function Reporter(collection) {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        reject(err);
      }

      console.log(docs);
      resolve(collection);
    });
  });
}

export default Reporter;
