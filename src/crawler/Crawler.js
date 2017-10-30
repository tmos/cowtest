import DandyCrawl from 'dandy-crawl';

function Page(url) {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}
/**
 *
 * @param {string} url : the base url to start the crawl
 */
function Crawler(url) {
  return new Promise((resolve, reject) => {
    console.log('Crawling...');
    const crawl = new DandyCrawl(url);
    crawl
      .getSitemapUrls()
      .then(data => data.nodes.values.map(node => new Page(node.url)))
      .then((pages) => {
        console.log(`${pages.length} pages crawled`);
        resolve(pages);
      })
      .catch(err => reject(err));
  });
}

export default Crawler;
