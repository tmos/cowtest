import cowtestConsoleReporter from './cowtestConsoleReporter';
import cowtestHtmlReporter from './cowtestHtmlReporter';

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {object} testsResults : results from the testRunner
 * @param {string|function} reporter : How to report the test results. in [console, html]
 */
function Reporter(seedUrl, testsResults, reporter = 'console') {
  return new Promise((resolve, reject) => {
    console.log('Reporting...');
    if (typeof reporter === 'string') {
      switch (reporter) {
        case 'html':
          resolve(cowtestHtmlReporter(
            seedUrl,
            testsResults,
            `${__dirname}/index.html`,
          ));
          break;

        case 'console':
          resolve(cowtestConsoleReporter(testsResults));
          break;

        default:
          reject(new Error('Unknown reporter type.'));
      }
    } else if (typeof reporter === 'function') {
      resolve(reporter(testsResults));
    } else {
      reject(new Error('You should provide a valid reporter.'));
    }
  });
}

export default Reporter;
