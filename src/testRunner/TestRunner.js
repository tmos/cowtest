/**
 *
 */

class TestRunner {
  constructor() {
    this.pages = [];
  }

  init(collection) {
    collection.find((err, docs) => {
      this.pages = docs;
      docs.map(el => console.log(el));
      return docs;
    });
  }
}

export default TestRunner;
