import { fileNames, errors } from './../const';

/**
 *
 * @param {object} datam : results from the testRunner
 */
function CowtestConsoleReporter(datam) {
  return new Promise((resolve, reject) => {
    datam.read(fileNames.crawlerStorageWithExt)
      .on('data', line => console.log(JSON.stringify(line.toString())))
      .on('end', () => resolve(true))
      .on('error', () => reject(errors.testResultsStreamReadError));
  });
}

export default CowtestConsoleReporter;
