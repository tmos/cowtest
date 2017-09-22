import test from 'ava';
// import DandyCrawl from 'dandy-crawl';

// const dandee = new DandyCrawl(url);
console.log(process.env.TEST_URL);
test('foo', async (t) => {
  // const data = await dandee.exploreDomain();
  // const nodes = data.nodes.values;

  t.is(process.env.TEST_URL, 'fake');
});
