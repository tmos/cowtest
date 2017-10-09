import { spawn } from 'child_process';
import Parser from 'tap-parser';

function CowtestAvaConnector(testsFileName, url) {
  return new Promise((resolve, reject) => {
    let res;

    const p = new Parser((results) => {
      res = results;
    });

    const ava = spawn('ava', [testsFileName, '--tap'], {
      env: {
        ...process.env,
        TEST_URL: url,
      },
    });

    if (!ava) {
      reject(new Error('fail to launch the process'));
    }

    ava.stdout.pipe(p);

    ava.on('close', () => {
      res.url = url;
      resolve(res);
    });
  });
}

export default CowtestAvaConnector;
