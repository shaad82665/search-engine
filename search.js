const missSearchesTerms = [];
const hitSearchTerms = [];
const movies = require("./movies.json");

//Fill array for searching
//Geting searching words
const getMissArray = (n = 100) => {
  for (let i = 0; i < n; i++) {
    let randomString = "";
    for (let j = 0; j < 10; j++) {
      randomString += Math.random().toString(36).substr(2, 1);
    }
    missSearchesTerms.push(randomString);
  }
};

const getHitArray = (n = 500) => {
  const base = 10;
  for (let i = 0; i < n; i++) {
    const dex = Math.ceil(Math.random() * 101 + base);
    const { title } = movies[dex];
    hitSearchTerms.push(title);
  }
};
getMissArray(250);
getHitArray(750);

const {
  runSearch: runOpenSearch,
  indexName,
  client,
} = require("./open-search/app");
const { runSearch: runMeilisearch } = require("./db-seaarch-meilisearch/app");
let osCompositeSum = 0;
let msCompositeSum = 0;
const run = async () => {
  //OpenSearch
  const osData = await runOpenSearch(
    client,
    indexName,
    hitSearchTerms,
    missSearchesTerms
  );
  osCompositeSum += osData.avgHitTime;
  // console.log(osData);
  //Meilisearch
  const msData = await runMeilisearch(hitSearchTerms, missSearchesTerms);
  msCompositeSum += msData.avgHitTime;
  // console.log(msData);
  // console.log("COMPOSITE AVG:");
  // console.log("OpenSeach: " + osCompositeSum / 10);
  // console.log("Meilisearch: " + msCompositeSum / 10);
};

run();
