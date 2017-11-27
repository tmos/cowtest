import cowtestConsoleReporter from './cowtestConsoleReporter';
import cowtestHtmlReporter from './cowtestHtmlReporter';
import { errors } from './../const';

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {object} datam : results from the testRunner
 * @param {string|function} reporter : How to report the test results. in [console, html]
 */
function Reporter(seedUrl, reporter, datam) {
  return new Promise((resolve, reject) => {
    console.log('Reporting...');
    if (typeof reporter === 'string') {
      switch (reporter) {
        case 'html':
          resolve(cowtestHtmlReporter(
            seedUrl,
            datam,
            `${__dirname}/index.html`,
          ));
          break;

        case 'console':
          resolve(cowtestConsoleReporter(datam));
          break;

        default:
          reject(errors.optionInvalidReporter);
      }
    } else if (typeof reporter === 'function') {
      resolve(reporter(datam));
    } else {
      reject(errors.invalidReporter);
    }
  });
}

export default Reporter;
