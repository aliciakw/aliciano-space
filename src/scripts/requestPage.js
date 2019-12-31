import Prismic from 'prismic-javascript';

const PRISMIC_API_URL = 'https://alicia-nospace.cdn.prismic.io/api/v2';

export default function requestPage(path) {
  const url = PRISMIC_API_URL + path;
  Prismic.getApi(url, { req: req }).then(function (api) {
    return api.query(""); // An empty query will return all the documents
  }).then(function (response) {
    console.log("Documents: ", response.results);
  }, function (err) {
    console.log("Something went wrong: ", err);
  });
}
