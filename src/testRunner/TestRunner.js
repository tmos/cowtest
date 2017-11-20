import PQueue from 'p-queue';
import fs from 'fs';
import csvWriter from 'csv-write-stream';
import { CowtestAvaConnector, CowtestPythonConnector } from './connectors';


function formatForCSV(testResults) {
  console.log(JSON.stringify(testResults));
  return {
    'Tested URL': testResults.url,
    'Test status': testResults.ok,
    'Failed tests': testResults.failures.map(failure => failure.name),
    'Failure details': testResults.failures.map(failure => failure.diag.message),
  };
}
/**
 *
 * @param {Array<Page>} urls : output from the crawler.
 * @param {*} connector : TODO
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 */
function TestRunner(urls, connector, testsFileName) {
  const writer = csvWriter();
  const path = `${__dirname}/out.csv`;
  writer.pipe(fs.createWriteStream(path));

  console.log('Testing...');

  return new Promise((resolve, reject) => {
    const defaultConnectors = new Map();

    defaultConnectors.set('ava', avaUrls => avaUrls.map(doc => async () => {
      console.log(`Testing ${doc.url}`);
      const testResults = await CowtestAvaConnector(testsFileName, doc.url);
      writer.write(formatForCSV(testResults));
      return testResults;
    }));
    defaultConnectors.set('python', pythonUrls => pythonUrls.map(doc => async () => {
      console.log(`Testing ${doc.url}`);
      const testResults = await CowtestPythonConnector(testsFileName, doc.url);
      writer.write(testResults);
      return testResults;
    }));

    let testPromises = [];

    if (defaultConnectors.has(connector)) {
      testPromises = defaultConnectors.get(connector)(urls);
    } else if (typeof connector === 'function') {
      testPromises = urls.map(doc => async () => {
        console.log(`Testing ${doc.url}`);
        const testResults = await connector(testsFileName, doc.url);
        writer.write(formatForCSV(testResults));
        return testResults;
      });
    } else {
      reject(new Error('Invalid connector.'));
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
