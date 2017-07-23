const crawler = require('./crawl');

const urls = crawler('https://orangina-rouge.org/');

console.log(urls);
