const { MeiliSearch } = require("meilisearch");
const movies = require("../movies.json");

const client = new MeiliSearch({
  host: "http://localhost:7700",
  // apiKey: "aSampleMasterKey",
});
const index = client.index("movies");

const addDocs = async () => {
  const response = await index.addDocuments(movies);
  console.log("data inserted");
  return response;
};
// addDocs();

const searchOne = async (title) => {
  try {
    const search = await index.search(title);
    return search;
  } catch (error) {
    console.log(`Error: ${error}`);
    return 0; // Return a default value or handle the error as needed
  }
};

const run = async () => {
  // const res = await searchOne("m?n");
  const res = await searchOne("hero");
  console.log(res);
};
run();

const runSearch = async (hitSearchTerms, missSearchesTerms) => {
  let hitTime = 0;
  for (let i = 0; i < hitSearchTerms.length; i++) {
    const res = await searchOne(hitSearchTerms[i]);
    hitTime += +res.processingTimeMs;
  }
  let missTime = 0;
  for (let i = 0; i < missSearchesTerms.length; i++) {
    const res = await searchOne(missSearchesTerms[i]);
    missTime += +res.processingTimeMs;
  }
  const avgHitTime = hitTime / hitSearchTerms.length;
  const avgMissTime = missTime / missSearchesTerms.length;
  console.log(`Meilisearch: Average hit time: ${avgHitTime}`);
  console.log(`Meilisearch: Average miss time: ${avgMissTime}`);
  return { avgHitTime, avgMissTime };
};
// runSearch();
module.exports = { runSearch };

// # Launch Meilisearch in development mode with a master key

// # Use ${pwd} instead of $(pwd) in PowerShell
