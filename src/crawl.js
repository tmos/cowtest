const SimpleCrawler = require('simplecrawler');
const mongojs = require('mongojs');

export default function (url, dbName) {
  const db = mongojs(`127.0.0.1:27017/${dbName}`, [url]);
  const collection = db.exampleorg;
  const crawler = new SimpleCrawler(url);
  const pages = [];

  crawler.on('crawlstart', () => {});

  crawler.on('fetchcomplete', (queueItem) => {
    pages.push(queueItem);
  });

  crawler.on('complete', () => {
    collection.insert(pages);
  });

  crawler.start();
}
