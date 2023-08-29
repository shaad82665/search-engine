const search = async (client, indexName) => {
  const { hitSearchTerms, missSearchesTerms } = require("../search");
  const hitData = await searchDocument(client, indexName, hitSearchTerms);
  // const missData = await searchDocument(client, indexName, missSearchesTerms);
  hitData.averageTime = hitData.totalTime / hitSearchTerms.length;
  // missData.averageTime = missData.totalTime / missSearchesTerms.length;
  console.log(`HIT DATA:`);
  console.log(hitData);
  console.log(`MISS DATA:`);
  // console.log(missData);
};

const addDocument = async (client, indexName) => {
  const document = {
    title: "pThe Outsider",
    author: "Stephen King",
    year: "2018",
    genre: "Crime fiction",
    email: "shadab@gmail.com",
  };
  console.log("Adding document:");
  const response = await client.index({
    index: indexName,
    body: document,
  });
  console.log("Data inserted successfully");
};

const deleteDocument = async (client, indexName) => {
  //complete == id
  console.log("Deleting document:");
  const response = await client.delete({
    index: indexName,
    // id: id,//todo
  });
  console.log(response.body);
};

//seaarch many
const searchDocument = async (client, indexName, titles) => {
  let totalTime = 0;
  let totalResults = 0;
  for (const title of titles) {
    const query = {
      size: 10000, // max size limit for read
      query: {
        match: {
          title: {
            query: title,
          },
        },
      },
    };
    // console.log("Search results:");
    const response = await client.search({
      index: indexName,
      body: query,
    });
    totalTime += +response.body.took;
    const totalResults = +response.body.hits.hits.length;
    // console.log(
    //   `Search completed. Time taken: ${response.body.took}ms, number of records found: ${response.body.hits.hits.length}`
    // );
  }
  return { totalTime, totalResults };
};

const openSearch = async (client, indexName) => {
  const overallStartTime = new Date();

  const hitData = await searchDocument(client, indexName, ["Chain Reaction"]);
  const missData = await searchDocument(client, indexName, ["asdasffsdsdvsd"]);

  const overallEndTime = new Date();
  const overallElapsedTime = overallEndTime - overallStartTime;

  hitData.averageTime = hitData.totalTime / hitSearchTerms.length;
  missData.averageTime = missData.totalTime / missSearchesTerms.length;

  console.log(`HIT DATA:`);
  console.log(hitData);
  console.log(`MISS DATA:`);
  console.log(missData);

  console.log(`Overall execution time: ${overallElapsedTime} ms`);
};
