/**
 *
 */

class Reporter {
  constructor() {
    this.reporter = {};
  }

  report(collection) {
    collection.find((err, docs) => {
      console.log(docs);
      this.reporter.test1 = false;

      return this.reporter;
    });
  }
}

export default Reporter;
