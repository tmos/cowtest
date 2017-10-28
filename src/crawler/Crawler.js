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
  // todo: create a Crawler type
  const crawl = new DandyCrawl(url);

  return new Promise((resolve, reject) => {
    crawl
      .getSitemapUrls()
      .then(data => data.nodes.values.map(node => new Page(node.url)))
      .then(pages => resolve(pages))
      .catch(err => reject(err));
  });
}

export default Crawler;
