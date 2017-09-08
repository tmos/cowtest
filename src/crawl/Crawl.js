import { crawler as C } from 'crawler';

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
  pgs.push(new Page(url));

  const c = new C({
    maxConnections: 10,
    // This will be called for each crawled page
    callback(error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const $ = res.$;
        // $ is Cheerio by default
        // a lean implementation of core jQuery designed specifically for the server
        const pageUrls = $('a').map(a => a.attr('href'));
        console.log(pageUrls);
      }
      done();
    },
  });

  c.queue(url);
  c.run();

  // Crawl start
  pgs.push(new Page(url));

  // Save
  collection.insert(pgs);

  return collection;
}


export default Crawler;
