// @flow

function TestRunner(urls: any, connector: any, testsFileName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const testPromises = urls.map(doc => connector(testsFileName, doc.url));

    return Promise.all(testPromises)
      .then((values) => {
        resolve(values);
      })
      .catch(error => reject(error));
  });
}

export default TestRunner;
