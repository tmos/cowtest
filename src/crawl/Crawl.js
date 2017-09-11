import dandyCrawl from 'dandy-crawl';

function Page(url) {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}

function Crawler(collection, url) {
  return new Promise((resolve, reject) => {
    dandyCrawl.exploreDomain(url)
      .then(data => data.nodes.values.map(node => new Page(node.url)))
      .then(pages => collection.insert(pages))
      .then(() => resolve(collection))
      .catch(err => reject(err));
  });
}

export default Crawler;
