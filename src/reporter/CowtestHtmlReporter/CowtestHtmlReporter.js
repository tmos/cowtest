import fs from 'fs';
import opn from 'opn';

function CowtestHtmlReporter(
  seedUrl,
  testsResults,
  outputDir,
) {
  console.log(outputDir);
  return new Promise((resolve, reject) => {
    let html = `<h1>${seedUrl}</h1>`;

    html += testsResults.map((testRes) => {
      let testHtml = `<h2>URL: ${testRes.url}</h2>`;

      testHtml += `Passed : ${testRes.pass} / ${testRes.count} <br />`;
      testHtml += `Failed : ${testRes.fail} / ${testRes.count} <br />`;

      testHtml += '<h3>Fail details</h3>';

      testHtml += testRes.failures
        .map((fail) => {
          let failuresHtml = `${fail.name}`;
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
