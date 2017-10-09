import Crawler from './crawler';
import { CowtestAvaConnector, TestRunner } from './testRunner';
import Reporter from './reporter';

function Cowtest(seedUrl, tests, reporter) {
  return Crawler(seedUrl)
    .then(urls => TestRunner(urls, CowtestAvaConnector, tests))
    .then(testsResults => Reporter(seedUrl, testsResults, reporter));
}

export default Cowtest;
