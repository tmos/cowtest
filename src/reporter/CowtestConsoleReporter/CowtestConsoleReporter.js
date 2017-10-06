// @flow

import util from 'util';

function CowtestConsoleReporter(testsResults: any): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!testsResults) {
      reject(new Error('No tests results provided'));
    }
    console.log(util.inspect(testsResults));
    resolve(true);
  });
}

export default CowtestConsoleReporter;
