import CowtestConsoleReporter from './CowtestConsoleReporter';
import CowtestHtmlReporter from './CowtestHtmlReporter';

function Reporter(seedUrl, testsResults, reporter = 'console') {
  return new Promise((resolve, reject) => {
    if (typeof reporter === 'string') {
      switch (reporter) {
        case 'html':
          resolve(CowtestHtmlReporter(
            seedUrl,
            testsResults,
            `${__dirname}/index.html`,
          ));
          break;

        case 'console':
          resolve(CowtestConsoleReporter(testsResults));
          break;

        default:
          reject(new Error('Unknown reporter type.'));
      }
    } else if (typeof reporter === 'function') {
      resolve(reporter(testsResults));
    } else {
      reject(new Error('Unknown reporter type.'));
    }
  });
}

export default Reporter;
