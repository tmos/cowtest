import fs from 'fs';
import opn from 'opn';
import { header, footer } from './HtmlConstants';
import { errors, fileNames } from './../../const';

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(seedUrl, testsResults) {
  let html = header;
  html +=
    '<nav class="navbar navbar-expand-lg navbar-light bg-light"><div class=container><span class="navbar-brand mb-0 h1">';
  html += `🐮❓: ${seedUrl}`;
  html += '</span></div></nav>';

  html += '<div class=container>';

  // The failed tests
  const fails = testsResults.filter(el => el.fail > 0);
  if (fails.length > 0) {
    html += `<h2>${fails.length} failed pages</h2>`;
    html += fails
      .map((testRes) => {
        let testHtml = '<h3>';
        testHtml += `<a href="${testRes.url}" target="blank">${testRes.url}</a>`;
        testHtml += ` <small class="badge badge-secondary bg-warning">🔥 ${testRes.fail}</small>`;
        testHtml += '</h3>';

        // Each error
        testHtml += testRes.failures
          .map((fail) => {
            let failuresHtml = `<div class="alert alert-danger" role="alert">${fail.name}</div>`;
            failuresHtml += `<pre><code>${escapeHtml(JSON.stringify(JSON.parse(fail.diag.message), null, 2))}</code></pre>`;
            return failuresHtml;
          })
          .join('');

        return testHtml;
      })
      .join('');
  }

  // The success
  const success = testsResults.filter(el => el.pass === el.count);
  if (success.length > 0) {
    html += '<h2>Successfull pages</h2>';
    html += '<ul>';
    html += success.map(testRes => `<li>${testRes.url}</li>`).join('');
    html += '</ul>';
  }

  html += '</div>';
  html += footer;

  return html;
}

/**
 *
 * @param {string} seedUrl : seed URL for the crawl. eg: http://example.org
 * @param {object} testsResults : results from the testRunner
 * @param {*} outputDir : absolute path for HTML generation
 */
async function CowtestHtmlReporter(seedUrl, datam, outputDir) {
  console.log(outputDir);

  function getUrls() {
    return new Promise((resolve, reject) => {
      let lines = [];

      datam
        .read(fileNames.testRunnerStorageWithExt)
        .on('data', (rawLine) => {
          const parsedLines = rawLine.toString().split('\n');
          parsedLines.pop();
          lines =
            lines.concat(parsedLines.map(line => JSON.parse(line.toString())));
        })
        .on('end', () => resolve(lines))
        .on('error', () => reject(errors.testResultsStreamReadError));
    });
  }

  const testResults = await getUrls();
  const html = buildHtml(seedUrl, testResults);

  fs.writeFile(outputDir, html, (err) => {
    if (err) {
      throw errors.htmlOutputWritingError;
    }

    opn(outputDir, { wait: false });
  });
}

export default CowtestHtmlReporter;
