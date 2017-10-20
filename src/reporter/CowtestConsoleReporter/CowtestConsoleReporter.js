/**
 *
 * @param {object} testsResults : results from the testRunner
 */
function CowtestConsoleReporter(testsResults) {
  return new Promise((resolve, reject) => {
    if (!testsResults) {
      reject(new Error('No tests results provided'));
    }

    console.log(JSON.stringify(testsResults));

    resolve(true);
  });
}

export default CowtestConsoleReporter;
