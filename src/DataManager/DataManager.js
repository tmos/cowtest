import fs from 'fs';
import JsonlFile from 'jsonl-file';
// import { MongoClient } from 'mongodb';

class DataManager {
  constructor(method, coStr) {
    this.method = method;
    this.coStr = coStr;

    if (this.method === 'jsonl') {
      this.fileStreams = {
        crawler: new JsonlFile(`${this.coStr}crawler.jsonl`),
        testRunner: new JsonlFile(`${this.coStr}testRunner.jsonl`),
      };
    } else if (this.method === 'mongodb') {
      // todo
    }
  }

  write(target, data) {
    if (this.method === 'jsonl') {
      this.fileStreams[target].write(data);
    } else if (this.method === 'mongodb') {
      // todo
    }
  }

  get(source) {
    let stream;
    if (this.method === 'jsonl') {
      stream = fs.createReadStream(`${this.coStr}${source}`);
    } else if (this.method === 'mongodb') {
      // todo
    }
    return stream;
  }

  close(target) {
    if (this.method === 'jsonl') {
      this.fileStreams[target].close();
    } else if (this.method === 'mongodb') {
      // todo
    }
  }
}
export default DataManager;
