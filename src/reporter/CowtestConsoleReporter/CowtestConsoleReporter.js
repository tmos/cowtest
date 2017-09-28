import util from 'util';

function CowtestConsoleReporter(testsResults) {
  console.log(util.inspect(testsResults));
}

export default CowtestConsoleReporter;
