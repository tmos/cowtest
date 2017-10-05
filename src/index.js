// @flow
import Crawler from './crawl';
import { CowtestAvaConnector, TestRunner } from './testRunner';
import Reporter from './reporter';

function Cowtest(
  seedUrl: string = '',
  tests: string = '',
  reporter: string = 'console',
) {
  Crawler(seedUrl)
    .then(urls => TestRunner(urls, CowtestAvaConnector, tests))
    .then(testsResults => Reporter(seedUrl, testsResults, reporter))
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

export default Cowtest;
