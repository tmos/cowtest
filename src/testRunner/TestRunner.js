import PQueue from 'p-queue';
import { CowtestAvaConnector, CowtestPythonConnector } from './connectors';

/**
 *
 * @param {Array<Page>} urls : output from the crawler.
 * @param {*} connector : TODO
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 */
function TestRunner(urls, connector, testsFileName) {
  console.log('Testing...');
  return new Promise((resolve, reject) => {
    let testPromises = [];

    if (typeof connector === 'string') {
      switch (connector) {
        case 'ava':
          testPromises = urls.map(doc => () => {
            console.log(`Testing ${doc.url}`);
            return CowtestAvaConnector(testsFileName, doc.url);
          });
          break;
        case 'python':
          testPromises = urls.map(doc => () => {
            console.log(`Testing ${doc.url}`);
            return CowtestPythonConnector(testsFileName, doc.url);
          });
          break;
        default:
          reject(new Error('Unknown connector name.'));
      }
    } else if (typeof reporter === 'function') {
      testPromises = urls.map(doc => () => {
        console.log(`Testing ${doc.url}`);
        return connector(testsFileName, doc.url);
      });
    } else {
      reject(new Error('You should provide a valid connector.'));
    }

    const queue = new PQueue({ concurrency: 4 });
    // Next line double single arrow function is to wrap the promise for p-queue
    return queue
      .addAll(testPromises)
      .then((values) => {
        resolve(values);
      })
      .catch(error => reject(error));
  });
}

export default TestRunner;
