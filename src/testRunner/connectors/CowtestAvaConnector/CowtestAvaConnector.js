import { spawn } from 'child_process';

function CowtestAvaConnector(testsFileName, url) {
  return new Promise((resolve, reject) => {
    const res = [];

    const ava = spawn('ava', [testsFileName, '--tap'], {
      env: {
        ...process.env,
        TEST_URL: url,
      },
    });

    if (!ava) {
      reject(new Error('fail to launch the process'));
    }

    ava.stdout.on('data', (data) => {
      res.push(data.toString());
    });

    ava.on('close', () => {
      resolve(res);
    });
  });
}

export default CowtestAvaConnector;
