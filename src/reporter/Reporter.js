/**
 *
 */

function Reporter(collection) {
  return new Promise((resolve, reject) => {
    collection.find({ runnedTests: { $gt: 0 } }).toArray()
      .then((docs) => {
        resolve(docs);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default Reporter;
