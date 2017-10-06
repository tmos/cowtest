// @flow
import CowtestConsoleReporter from './CowtestConsoleReporter';
import CowtestHtmlReporter from './CowtestHtmlReporter';

function Reporter(seedUrl: string, testsResults: any, reporter: string | ((testsResults: any) => mixed) = 'console'): Promise<any> {
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
    } else {
      resolve(reporter(testsResults));
    }
  });
}

export default Reporter;
