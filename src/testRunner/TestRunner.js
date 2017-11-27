import PQueue from 'p-queue';
import { CowtestAvaConnector, CowtestPythonConnector } from './connectors';

/**
 *
 * @param {Array<Page>} urls : output from the crawler.
 * @param {*} connector : TODO
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 */
function TestRunner(urls, connector, testsFileName, dataManager) {
  console.log('Testing...');

  return new Promise((resolve, reject) => {
    const defaultConnectors = new Map();

    defaultConnectors.set('ava', avaUrls => avaUrls.map(doc => async () => {
      console.log(`Testing ${doc.url}`);
      const testResults = await CowtestAvaConnector(testsFileName, doc.url);
      dataManager.write('testRunner', testResults);
      return testResults.ok === true;
    }));
    defaultConnectors.set('python', pythonUrls => pythonUrls.map(doc => async () => {
      console.log(`Testing ${doc.url}`);
      const testResults = await CowtestPythonConnector(testsFileName, doc.url);
      dataManager.write('testRunner', testResults);
      return testResults.ok === true;
    }));

    let testPromises = [];

    if (defaultConnectors.has(connector)) {
      testPromises = defaultConnectors.get(connector)(urls);
    } else if (typeof connector === 'function') {
      testPromises = urls.map(doc => async () => {
        console.log(`Testing ${doc.url}`);
        const testResults = await connector(testsFileName, doc.url);
        dataManager.write('testRunner', testResults);
        return testResults.ok === true;
      });
    } else {
      reject(new Error('Invalid connector.'));
    }

    const queue = new PQueue({ concurrency: 25 });
    return queue
      .addAll(testPromises)
      .then((testResults) => {
        console.log(testResults);
        dataManager.close('testRunner');
        resolve();
      })
      .catch(error => reject(error));
  });
}

export default TestRunner;
