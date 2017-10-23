import test from 'ava';
import Cowtest from './../dist';

const seedUrl = 'http://127.0.0.1:8080';
const tests = `${__dirname}/testSource.js`;
const connector = 'ava';

test('Page title should be "fake"', async (t) => {
  function reporter(testsResults) {
    return new Promise((resolve, reject) => {
      if (!testsResults) {
        reject(new Error('No tests results provided'));
      }
      resolve(testsResults);
    });
  }

  const testsRes = await Cowtest(
    seedUrl,
    tests,
    connector,
    reporter,
  );

  testsRes.map((pageTested) => {
    t.is(pageTested.count, 1);
    t.is(pageTested.pass, 0);
    t.is(pageTested.fail, 1);
    t.is(pageTested.failures[0].name, 'Page title should be "fake"');
    return true;
  });
});
