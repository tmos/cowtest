import { spawn } from 'child_process';
import Parser from 'tap-parser';

/**
 *
 * @param {string} testsFileName : test file absolute path. eg: `${__dirname}/frontend-tests.js`
 * @param {string} url : the current url.
 * Used to be able to know on which page was executed the test.
 */
function CowtestPythonConnector(testsFileName, url) {
  return new Promise((resolve, reject) => {
    let res;

    const p = new Parser((results) => {
      res = results;
    });

    const python = spawn('python3.5', [testsFileName], {
      env: {
        ...process.env,
        TEST_URL: url,
      },
    });

    if (!python) {
      reject(new Error('fail to launch the process'));
    }

    python.stdout.pipe(p);

    python.on('close', () => {
      res.url = url;
      resolve(res);
    });
  });
}

export default CowtestPythonConnector;
