#!/usr/bin/env node
'use strict';

var configFile = require('../cowtestconf');
var crawler = require('./crawl');
var testRunner = require('./test_runner');

// Crawl and save
crawler.default(configFile.seed_url, configFile.db_name);

// Analyse the data
// testRunner.default(configFile.seed_url, configFile.db_name);

// Report