// @flow

import Cowtest from '.././';

const seedUrl: string = 'http://127.0.0.1:8080';
const tests: string = `${__dirname}/avatest.js`;
const reporter: string = 'console';
// const dataSaveMethod = 'none';

Cowtest(
  seedUrl,
  tests,
  reporter,
//  dataSaveMethod,
);
