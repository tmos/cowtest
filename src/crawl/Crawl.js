/**
 *
 */


class Page {
  constructor(url) {
    this.url = url;
  }
}

class Crawler {
  constructor() {
    this.pages = [];
  }

  crawl(collection, url) {
    const pgs = [];

    // Crawl start
    pgs.push(new Page(url));
    // Crawl end

    collection.insert(pgs);

    this.pages = pgs;
    return pgs;
  }
}


export default Crawler;
