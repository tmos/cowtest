// @flow
/* global Page, DandyCrawl, Crawl */

declare type Page = {
  url: string,
  runnedTests: Array<string>,
  passedTests: Array<string>,
  failledTests: Array<string>,
};

declare type DandyCrawl = any;

declare type CrawlPage = {
  id: number,
  url: string,
  isExplored: boolean,
};

declare type CrawlEdge = {
  id: number,
  from: string,
  to: string,
};

declare type Crawl = {
  nodes: {
    values: Array<CrawlPage>,
    lastNodeId: number,
    push: (currentUrl: string) => void,
    get: (currentUrl: string) => CrawlPage,
  },
  edges: {
    values: Array<CrawlEdge>,
    lastEdgeId: number,
    push: (currentUrl: string) => void,
    get: (currentUrl: string) => CrawlEdge,
  },
};
