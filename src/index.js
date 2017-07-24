#!/usr/bin/env node

const configFile = require('../cowtestconf');
const crawler = require('./crawl');
const testRunner = require('./test_runner');

// Crawl and save
crawler.default(configFile.seed_url, configFile.db_name);

// Analyse the data
// testRunner.default(configFile.seed_url, configFile.db_name);

// Report
