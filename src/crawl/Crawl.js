/**
 *
 */

function Page(url) {
  return {
    url,
    runnedTests: [],
    passedTests: [],
    failledTests: [],
  };
}

function Crawler(collection, url) {
  const pgs = [];

  // Crawl start
  pgs.push(new Page(url));

  // Save
  collection.insert(pgs);

  return collection;
}


export default Crawler;
