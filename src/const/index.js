function undefinedVariable(variableName) {
  return `${variableName} is not defined.`;
}

function invalidValue(variableName, builtInList) {
  let err = `Invalid value of ${variableName}.`;
  if (builtInList) {
    err += ` Available values are : ${builtInList.map(val => val)}.`;
  }
  return err;
}

const errors = {
  optionUndefinedSeedUrl: new Error(`Options error: ${undefinedVariable('seed URL')}`),
  optionUndefinedTestFileName: new Error(`Options error: ${undefinedVariable('test file name')}`),
  optionUndefinedConnector: new Error(`Options error: ${undefinedVariable('connector')}`),
  optionInvalidConnector: new Error(`Options error: ${invalidValue('connector', ['ava', 'python'])}`),
  optionInvalidStorage: new Error(`Options error: ${invalidValue('storage', ['mongodb', 'jsonl'])}`),
  optionInvalidReporter: new Error(`Options error: ${invalidValue('reporter', ['html', 'console'])}`),
  testResultsStreamReadError: new Error('Error while loading the test results file stream.'),
  crawlerStreamReadError: new Error('Error while loading the crawler results file stream.'),
  htmlOutputWritingError: new Error('Error while writing the reporter html output.'),
};
const fileNames = {
  crawlerStorage: 'crawler',
  testRunnerStorage: 'testRunner',
  crawlerStorageWithExt: 'crawler.jsonl',
  testRunnerStorageWithExt: 'testRunner.jsonl',
};

export {
  errors,
  fileNames,
};
