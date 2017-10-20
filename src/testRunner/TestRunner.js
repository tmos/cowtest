/**
 *
 * @param {Array<Page>} urls : output from the crawler.
 * @param {*} connector : TODO
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 */
function TestRunner(urls, connector, testsFileName) {
  return new Promise((resolve, reject) => {
    const testPromises = urls.map(doc => connector(testsFileName, doc.url));

    return Promise.all(testPromises)
      .then((values) => {
        resolve(values);
      })
      .catch(error => reject(error));
  });
}

export default TestRunner;
