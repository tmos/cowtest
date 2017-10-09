// @flow

// todo: create a type for URLS
// todo: create a type for connector

function TestRunner(urls: any, connector: any, testsFileName: string): Promise<any> {
  return new Promise((resolve, reject): any => {
    const testPromises: Array<Promise<any>> = urls.map(doc => connector(testsFileName, doc.url));

    return Promise.all(testPromises)
      .then((values) => {
        resolve(values);
      })
      .catch(error => reject(error));
  });
}

export default TestRunner;
