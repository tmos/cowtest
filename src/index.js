import crawler from './crawler';
import testRunner from './testRunner';
import reporter from './reporter';
import DataManager from './DataManager';
/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {string} tests : absolute path to the test file. eg: `${__dirname}/frontend-tests.js`
 * @param {string|function} connector : TODO
 * @param {object} dataSaveMethod :
 * @param {string|function} rep : How to report the test results. in [console, html]
 */
function Cowtest(opts) {
  const seedUrl = opts.seedUrl || undefined;
  const tests = opts.tests || undefined;
  const connector = opts.connector || undefined;
  const report = opts.report || 'console';
  const dataSaveMethod = opts.dataSaveMethod || {
    method: 'jsonl',
    coStr: 'data.jsonl',
  };

  if (seedUrl === undefined) {
    throw Error('Options error: you should pass a valid URL');
  }
  if (tests === undefined) {
    throw Error('Options error: you should provide a test file name');
  }
  if (connector === undefined) {
    throw Error('Options error: you should provide a test file name');
  }
  if (typeof connector === 'function' || typeof connector === 'string') {
    if (
      typeof connector === 'string' &&
      ['ava', 'python'].indexOf(connector) === -1
    ) {
      throw new Error('Options error: available built-in connectors are : ava, python');
    }
  }
  if (
    typeof dataSaveMethod === 'object' &&
    ['mongodb', 'jsonl'].indexOf(dataSaveMethod.method) === -1
  ) {
    throw new Error('Options error: available data storage are: mongodb, jsonl');
  }
  if (
    typeof report !== 'string' ||
    ['console', 'html'].indexOf(report) === -1
  ) {
    throw new Error('Options error: available built-in connectors are : html, console');
  }

  const datam = new DataManager(dataSaveMethod.method, dataSaveMethod.coStr);

  console.log('Starting...');
  console.log(seedUrl);
  return crawler(seedUrl)
    .then(urls => testRunner(urls, connector, tests, datam))
    .then(testResults => reporter(seedUrl, testResults, report))
    .catch((err) => {
      console.log(err);
    });
}

export default Cowtest;
