// @flow

import DandyCrawl from 'dandy-crawl';

function Page(url: string): Page {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}

function Crawler(url: string): Promise<any> {
  // todo: create a Crawler type
  const crawl: any = new DandyCrawl(url);

  return new Promise((resolve, reject) => {
    crawl
      .exploreDomain()
      .then((data): Array<Page> => data.nodes.values.map(node => new Page(node.url)))
      .then(pages => resolve(pages))
      .catch((err): any => reject(err));
  });
}

export default Crawler;
