import { fileNames, errors } from './../const';

/**
 *
 * @param {object} datam : results from the testRunner
 */
function CowtestConsoleReporter(datam) {
  return new Promise((resolve, reject) => {
    datam.read(fileNames.testRunnerStorageWithExt)
      .on('data', (rawLine) => {
        const parsedLines = rawLine.toString().split('\n');
        parsedLines.pop();
        parsedLines.map(line => console.log(JSON.parse(line.toString())));
      })
      .on('end', () => resolve(true))
      .on('error', () => reject(errors.testResultsStreamReadError));
  });
}

export default CowtestConsoleReporter;
