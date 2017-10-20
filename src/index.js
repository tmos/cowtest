import Crawler from './crawler';
import { CowtestAvaConnector, TestRunner } from './testRunner';
import Reporter from './reporter';

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {string} tests : absolute path to the test file. eg: `${__dirname}/frontend-tests.js`
 * @param {string|function} reporter : How to report the test results. in [console, html]
 */
function Cowtest(seedUrl, tests, reporter) {
  return Crawler(seedUrl)
    .then(urls => TestRunner(urls, CowtestAvaConnector, tests))
    .then(testsResults => Reporter(seedUrl, testsResults, reporter));
}

export default Cowtest;
