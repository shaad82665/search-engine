// const missSearchesTerms = [];
// const hitSearchTerms = [];
// const movies = require("./movies.json");

// //Fill array for searching
// //Geting searching words
// const getMissArray = (n = 100) => {
//   for (let i = 0; i < n; i++) {
//     let randomString = "";
//     for (let j = 0; j < 10; j++) {
//       randomString += Math.random().toString(36).substr(2, 1);
//     }
//     missSearchesTerms.push(randomString);
//   }
// };

// const getHitArray = (n = 500) => {
//   const base = 10;
//   for (let i = 0; i < n; i++) {
//     const dex = Math.ceil(Math.random() * 101 + base);
//     const { title } = movies[dex];
//     hitSearchTerms.push(title);
//   }
// };
// getMissArray(250);
// getHitArray(2200);

// const {
//   runSearch: runOpenSearch,
//   indexName,
//   client,
// } = require("./open-search/app");
// const { runSearch: runMeilisearch } = require("./db-seaarch-meilisearch/app");
// let osCompositeSum = 0;
// let msCompositeSum = 0;
// let batchSize = 200;
// let currentIndex = 0;
// const run = async () => {
//   for (let i = 0; i < 24; i++) {
//     console.log("round: ", i + 1);
//     const batchHitSearchTerms = hitSearchTerms.slice(
//       0,
//       currentIndex + batchSize
//     );
//     batchSize += 100;
//     console.log(`hit search batch size ${batchHitSearchTerms.length}`);
//     console.log("count " + i);
//     //OpenSearch
//     const osData = await runOpenSearch(
//       client,
//       indexName,
//       batchHitSearchTerms,
//       missSearchesTerms
//     );
//     osCompositeSum += osData.avgHitTime;
//     // console.log(osData);
//     //Meilisearch
//     const msData = await runMeilisearch(batchHitSearchTerms, missSearchesTerms);
//     msCompositeSum += msData.avgHitTime;
//     // console.log(msData);
//   }
//   console.log("COMPOSITE AVG:");
//   console.log("OpenSeach: " + osCompositeSum / 24);
//   console.log("Meilisearch: " + msCompositeSum / 24);
// };

// run();

// // avg
// // Open Search: Average hit time: 2.5626666666666667
// // Open Search Average miss time: 1.028
// // Meilisearch: Average hit time: 1.168
// // Meilisearch: Average miss time: 0.112

// //composite :

// // meil 1.12604
// //open 2.34264
