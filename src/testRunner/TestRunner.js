
function TestRunner(collection, tests) {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray(async (err, docs) => {
      if (err) {
        console.log('ERREUR', __filename);
        console.log(err);
        return reject(err);
      }

      const testPromises = docs.map(doc => tests(doc.url));

      const res = await Promise.all(testPromises)
        .then((values) => {
          console.log(values);
          return resolve(values);
        })
        .catch((error) => {
          console.log('ERREUR: dans la liste de promises');
          return reject(error);
        });

      console.log(res);
      return resolve(res);
    });
  });
}

export default TestRunner;
