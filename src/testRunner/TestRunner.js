/**
 *
 */

function TestRunner(collection, tests) {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        reject(err);
      }

      console.log(`\n --> [${__filename}] Get saved Data`);
      console.log(docs);

      console.log(`\n --> [${__filename}] Tests`);

      return tests(docs[0].url)
        .then((data) => {
          console.log(`\n --> [${__filename}] Test runned !!!!!`);
          console.log(data);
          resolve(data);
        })
        .catch(oops => reject(oops));
    });
  });
}

export default TestRunner;
