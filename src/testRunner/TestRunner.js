import Sweetlog from '../../sweetlog';

const sl = new Sweetlog();

function TestRunner(collection, tests) {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        reject(err);
      }

      sl.info(`[${__filename}] Get saved Data`);

      return tests(docs[0].url)
        .then((data) => {
          sl.info(`\n --> [${__filename}] Test runned !!!!!`);
          sl.info(data);
          resolve(data);
        })
        .catch(oops => reject(oops));
    });
  });
}

export default TestRunner;
