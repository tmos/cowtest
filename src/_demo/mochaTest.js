import Nightmare from 'nightmare';

export default function (url) {
  return new Promise(async (resolve, reject) => {
    console.log('Bool');
    const nightmare = Nightmare();

    const pageTitle = await nightmare
      .goto(url)
      // eslint-disable-next-line no-undef
      .evaluate(() => document.title);

    if (!pageTitle) {
      return reject();
    }

    return resolve(pageTitle === 'Example Domain');
  });
}
