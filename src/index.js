import Crawler from './crawler';
import TestRunner from './testRunner';
import Reporter from './reporter';

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {string} tests : absolute path to the test file. eg: `${__dirname}/frontend-tests.js`
 * @param {string|function} connector : TODO
 * @param {string|function} reporter : How to report the test results. in [console, html]
 */
function Cowtest(seedUrl, tests, connector, reporter) {
  console.log('Starting...');
  return Crawler(seedUrl)
    .then(urls => TestRunner(urls, connector, tests))
    .then(testsResults => Reporter(seedUrl, testsResults, reporter));
}

export default Cowtest;
