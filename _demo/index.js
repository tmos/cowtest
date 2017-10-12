const Cowtest = require('./../dist');

const seedUrl = 'http://127.0.0.1:8080';
const tests = `${__dirname}/avatest.js`;
const reporter = 'console';
// const dataSaveMethod = 'none';

Cowtest(
  seedUrl,
  tests,
  reporter,
//  dataSaveMethod,
);
