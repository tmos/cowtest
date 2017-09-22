
function TestRunner(collection, connector, testsFileName) {
  return new Promise((resolve, reject) => {
    collection
      .find({})
      .toArray(async (err, docs) => {
        if (err) {
          return reject(err);
        }

        const testPromises = docs.map(doc => connector(testsFileName, doc.url));

        return Promise.all(testPromises)
          .then((values) => {
            console.log(values);
            resolve(collection);
          })
          .catch(error => reject(error));
      });
  });
}

export default TestRunner;
