// @flow

import { spawn } from 'child_process';
import Parser from 'tap-parser';

function CowtestAvaConnector(testsFileName: string, url: string): Promise<any> {
  return new Promise((resolve, reject): any => {
    let res: any;

    const p: any = new Parser((results) => {
      res = results;
    });

    const ava: any = spawn('ava', [testsFileName, '--tap'], {
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
