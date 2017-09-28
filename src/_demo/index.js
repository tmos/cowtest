import Cowtest from '.././';

Cowtest({
  seedUrl: 'http://127.0.0.1:8080',
  tests: `${__dirname}avatest.js`,
  reporter: 'console',
  dataSaveMethod: 'none',
});
