import Nightmare from 'nightmare';

const nightmare = Nightmare();

export default function (url) {
  return new Promise((resolve, reject) => nightmare
  // load a url
    .goto(url)
    // simulate typing into an element identified by a CSS selector
    // here, Nightmare is typing into the search bar
    .evaluate(() => {
      // eslint-disable-next-line no-undef
      console.log(document.title, 'test');
      return nightmare;
    })
    // end the Nightmare instance along with the Electron instance it) wraps
    .end()
    // run the queue of commands specified, followed by logging the HREF
    .then((result) => {
      console.log(result);
      resolve(result);
    })
    // catch errors if they happen
    .catch((error) => {
      reject(`an error has occurred: ${error}`);
    }));
}
