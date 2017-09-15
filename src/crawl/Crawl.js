import DandyCrawl from 'dandy-crawl';

function Page(url) {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}

function Crawler(collection, url) {
  const crawl = new DandyCrawl(url);
  return new Promise((resolve, reject) => {
    crawl.exploreDomain()
      .then(data => data.nodes.values.map(node => new Page(node.url)))
      .then(pages => collection.insert(pages))
      .then(() => resolve(collection))
      .catch(err => reject(err));
  });
}

export default Crawler;
