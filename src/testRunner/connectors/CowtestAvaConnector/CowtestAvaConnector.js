import Api from 'ava/api';

function CowtestAvaConnector(tests, url) {
  const api = new Api();

  api.run(tests(url));
}

export default CowtestAvaConnector;
