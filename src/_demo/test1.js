import Nightmare from 'nightmare';

const nightmare = Nightmare();

export default function (url) {
  return new Promise(async (resolve, reject) => {
    const pageTitle = await nightmare
      .goto(url)
      // eslint-disable-next-line no-undef
      .evaluate(() => document.title, 'test');

    if (!pageTitle) {
      reject();
    }
    resolve(pageTitle === 'Example Domain');
  });
}
