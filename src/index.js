import crawler from './crawler';
import testRunner from './testRunner';
import reporter from './reporter';

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {string} tests : absolute path to the test file. eg: `${__dirname}/frontend-tests.js`
 * @param {string|function} connector : TODO
 * @param {string|function} rep : How to report the test results. in [console, html]
 */
function Cowtest(seedUrl, tests, connector, rep) {
  console.log('Starting...');
  return crawler(seedUrl)
    .then(urls => testRunner(urls, connector, tests))
    .then(testsResults => reporter(seedUrl, testsResults, rep));
}

export default Cowtest;
