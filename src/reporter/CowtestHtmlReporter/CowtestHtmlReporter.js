// @flow

import fs from 'fs';
import opn from 'opn';

function CowtestHtmlReporter(
  seedUrl: string,
  testsResults: any,
  outputDir: string,
): Promise<boolean> {
  console.log(outputDir);
  return new Promise((resolve, reject) => {
    let html: string = `<h1>${seedUrl}</h1>`;

    html += testsResults.map((testRes): string => {
      let testHtml: string = `<h2>URL: ${testRes.url}</h2>`;

      testHtml += `Passed : ${testRes.pass} / ${testRes.count} <br />`;
      testHtml += `Failed : ${testRes.fail} / ${testRes.count} <br />`;

      testHtml += '<h3>Fail details</h3>';

      testHtml += testRes.failures
        .map((fail): string => {
          let failuresHtml: string = `${fail.name}`;
          failuresHtml += `<code>${fail.values}</code>`;

          return failuresHtml;
        })
        .join('');

      return testHtml;
    });

    fs.writeFile(outputDir, html, (err) => {
      if (err) {
        reject(err);
      }

      opn(outputDir);

      resolve(true);
    });
  });
}

export default CowtestHtmlReporter;
