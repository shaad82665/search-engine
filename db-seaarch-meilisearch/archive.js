// const search = async () => {
//   const startTime = new Date();
//   client
//     .index("movies")
//     .search("shadab")
//     .then((res) => console.log(res))
//     .then(() => {
//       const endTime = new Date();
//       const elapsedTime = endTime - startTime;
//       console.log(`Time taken: ${elapsedTime} ms`);
//     });
// };
// search();

const search = async (titles) => {
  const limit = 1000;
  let totalTime = 0;
  const searchPromises = titles.map(async (title) => {
    const res = await client.index("movies").search(title, { limit });
    totalTime += +res.processingTimeMs;
    return res;
  });

  return Promise.all(searchPromises)
    .then((searchResults) => {
      return { totalTime, avgTime: totalTime / titles.length };
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const melliSearch = async () => {
  try {
    const overallStartTime = new Date();

    const hitTime = await search(["Chain Reaction"]);
    const missTime = await search(["asdasffsdsdvsd"]);

    const overallEndTime = new Date();
    const overallElapsedTime = overallEndTime - overallStartTime;

    console.log("hit time", hitTime);
    console.log("miss time", missTime);
    console.log(`Overall execution time: ${overallElapsedTime} ms`);
  } catch (error) {
    console.error("Error:", error);
  }
};
