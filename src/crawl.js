const Crawler = require("crawler");

module.exports = function(seed) {
  let urls = []

  const c = new Crawler({
    maxConnections: 10,
      // This will be called for each crawled page
    callback: function(error, res, done) {
      if (!error) {
        const $ = res.$;
          const links = $('a');
          $(links).each(function(i, link){
            urls.push($(link).attr('href'))
          });
      }
      done();
    },
  });

  c.queue(seed);
}
