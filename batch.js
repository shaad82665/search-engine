const fs = require("fs");
const path = require("path");
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

// Read command-line arguments
const rounds = parseInt(process.argv[2]) || 5; // Default to 2 if not provided
let batchSize = parseInt(process.argv[3]) || 200; // Default to 200 if not provided

//get searching value
getMissArray(250);
getHitArray(rounds * batchSize);

const {
  runSearch: runOpenSearch,
  indexName,
  client,
} = require("./open-search/app");
const { runSearch: runMeilisearch } = require("./db-seaarch-meilisearch/app");

let osCompositeSum = 0;
let msCompositeSum = 0;
const searchData = [];

const shift = batchSize;
let currentIndex = 0;

const run = async () => {
  for (let i = 0; i < rounds; i++) {
    console.log("round: ", i + 1);
    const batchHitSearchTerms = hitSearchTerms.slice(currentIndex, batchSize);
    // console.log(`Start: ${currentIndex} ${batchSize}`);
    // console.log(`batch size for hit search ${batchSize - currentIndex}`);
    currentIndex += shift;
    batchSize += shift;

    //OpenSearch
    const osData = await runOpenSearch(
      client,
      indexName,
      batchHitSearchTerms,
      missSearchesTerms
    );
    osCompositeSum += osData.avgHitTime; //for composite avg

    //Meilisearch
    const msData = await runMeilisearch(batchHitSearchTerms, missSearchesTerms);
    msCompositeSum += msData.avgHitTime; //for composite avg

    //pushing data into array
    const searchResponse = {
      batchSize: batchHitSearchTerms.length,
      avgOSHit: osData.avgHitTime,
      avgMSHit: msData.avgHitTime,
    };
    searchData.push(searchResponse);
  }
  console.log("COMPOSITE AVERAGE:");
  console.log("OpenSeach: " + osCompositeSum / rounds);
  console.log("Meilisearch: " + msCompositeSum / rounds);

  // Write searchData array to search-response.json file
  const dataFilePath = path.join(
    __dirname,
    "reponse-data",
    "search-response.json"
  );
  fs.writeFileSync(dataFilePath, JSON.stringify(searchData, null, 2));
  console.log("Search response data saved to /data/search-response.json");
};

run();
