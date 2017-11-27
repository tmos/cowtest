import DandyCrawl from 'dandy-crawl';

/**
 *
 * @param {string} url : the base url to start the crawl
 */
function Crawler(url, datam) {
  return new Promise((resolve, reject) => {
    console.log('Crawling...');
    const crawl = new DandyCrawl(url);
    crawl
      .getSitemapUrls()
      .then(data => data.nodes.values.map((node) => {
        datam.write('crawler', node.url);
        return 1;
      }).length)
      .then((pagesCount) => {
        datam.close('crawler');
        console.log(`${pagesCount} pages crawled`);
        resolve();
      })
      .catch(err => reject(err));
  });
}

export default Crawler;
