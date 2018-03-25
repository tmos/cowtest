import PQueue from 'p-queue';
import { CowtestAvaConnector, CowtestPythonConnector } from './connectors';
import { fileNames, errors } from './../const';

/**
 *
 * @param {Array<Page>} urls : output from the crawler.
 * @param {*} connector : TODO
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 */
function TestRunner(connector, testsFileName, datam) {
  /** Data structure */
  const defaultConnectors = new Map();
  defaultConnectors.set('ava', avaUrls =>
    avaUrls.map(doc => async () => {
      console.log(`Testing ${doc}`);
      const testResults = await CowtestAvaConnector(testsFileName, doc);
      datam.write('testRunner', testResults);
      return testResults.ok === true;
    }));
  defaultConnectors.set('python', pythonUrls =>
    pythonUrls.map(doc => async () => {
      console.log(`Testing ${doc}`);
      const testResults = await CowtestPythonConnector(testsFileName, doc);
      datam.write('testRunner', testResults);
      return testResults.ok === true;
    }));
  defaultConnectors.set('_custom', customUrls =>
    customUrls.map(doc => async () => {
      console.log(`Testing ${doc}`);
      const testResults = await connector(testsFileName, doc);
      datam.write('testRunner', testResults);
      return testResults.ok === true;
    }));

  /** Util for waiting the end of the streams */
  function preparePromises(connecta) {
    return new Promise((resolve, reject) => {
      let testPromises = [];

      if (defaultConnectors.has(connecta)) {
        const conn = defaultConnectors.get(connecta);
        datam
          .read(fileNames.crawlerStorageWithExt)
          .on('data', (line) => {
            const parsedUrls = line.toString().split('\n');
            parsedUrls.pop();
            const connectorResult =
              conn(parsedUrls.map(stringified => JSON.parse(stringified).url));
            testPromises = testPromises.concat(connectorResult);
          })
          .on('end', () => {
            resolve(testPromises);
          })
          .on('error', () => reject(errors.crawlerStreamReadError));
      } else if (typeof connector === 'function') {
        const conn = defaultConnectors.get('_custom');
        datam
          .read(fileNames.crawlerStorageWithExt)
          .on('data', (line) => {
            const parsedUrls = line.toString().split('\n');
            const connectorResult =
              conn(parsedUrls.map(stringified => JSON.parse(stringified).url));
            testPromises = testPromises.concat(connectorResult);
          })
          .on('end', () => resolve(testPromises))
          .on('error', () => reject(errors.crawlerStreamReadError));
      } else {
        reject(errors.optionInvalidConnector);
      }
    });
  }

  console.log('Testing...');

  return new Promise(async (resolve, reject) => {
    const testPromises = await preparePromises(connector);
    const queue = new PQueue({ concurrency: 250 });
    return queue
      .addAll(testPromises)
      .then((testResults) => {
        console.log('testResults', testResults);
        datam.close('testRunner');
        resolve();
      })
      .catch(err => reject(err));
  });
}

export default TestRunner;
