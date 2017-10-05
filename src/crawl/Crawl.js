// @flow
import DandyCrawl from 'dandy-crawl';

function Page(url: string) {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}

function Crawler(url: string): Promise<any> {
  const crawl = new DandyCrawl(url);

  return new Promise((resolve, reject) => {
    crawl.exploreDomain()
      .then(data => data.nodes.values.map(node => new Page(node.url)))
      .then(pages => resolve(pages))
      .catch(err => reject(err));
  });
}

export default Crawler;
