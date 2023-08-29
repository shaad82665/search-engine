"use strict";
const documents = require("../movies.json"); //Sample data
const indexName = "books"; //Index name for the db
// const { hitSearchTerms, missSearchesTerms } = require("../search");

// Create a client
const host = "localhost";
const protocol = "https";
const port = 9200;
const auth = "admin:admin"; // For testing only. Don't store credentials in code.

const { Client } = require("@opensearch-project/opensearch");
const fs = require("fs");
const { title } = require("process");
const client = new Client({
  node: protocol + "://" + auth + "@" + host + ":" + port,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createIndex = async (client, indexName) => {
  console.log("Creating index:");
  const settings = {
    settings: {
      index: {
        number_of_shards: 4,
        number_of_replicas: 3,
      },
    },
  };
  const response = await client.indices.create({
    index: indexName,
    body: settings,
  });
  console.log("Index created successfully...");
  // console.log(response.body);
};

const addDocuments = async (client, indexName) => {
  console.log("Adding documents:");
  const responses = await Promise.all(
    documents.map(async (document) => {
      const response = await client.index({
        index: indexName,
        body: document,
      });
    })
  );
  console.log(`${documents.length} documents inserted...`);
  return responses.body;
};

const deleteIndex = async (client, indexName) => {
  console.log("Deleting index:");
  const response = await client.indices.delete({
    index: indexName,
  });
  console.log(response.body);
};
const deleteAllDocuments = async (client, indexName) => {
  console.log("Deleting all documents:");

  const { body } = await client.deleteByQuery({
    index: indexName,
    body: {
      query: {
        match_all: {}, // Match all documents
      },
    },
  });

  console.log("Documents deleted:", body);
};

// const searchOne = async (client, indexName, regex) => {
//   var query = {
//     query: {
//       regexp: {
//         title: {
//           value: regex,
//         },
//       },
//     },
//   };

//   var response = await client.search({
//     index: indexName,
//     body: query,
//   });

//   return response.body;
// };

const searchOne = async (client, indexName, title) => {
  var query = {
    query: {
      match: {
        title: {
          query: title,
        },
      },
    },
  };

  var response = await client.search({
    index: indexName,
    body: query,
  });
  return response.body;
};

const runSearch = async (
  client,
  indexName,
  hitSearchTerms,
  missSearchesTerms
) => {
  let hitTime = 0;
  for (let i = 0; i < hitSearchTerms.length; i++) {
    const res = await searchOne(client, indexName, hitSearchTerms[i]);
    // console.log(`for ${i} ${res.took}`);
    hitTime += +res.took;
  }
  let missTime = 0;
  for (let i = 0; i < missSearchesTerms.length; i++) {
    const res = await searchOne(client, indexName, missSearchesTerms[i]);
    // console.log(`for ${i} ${res.took}`);
    missTime += +res.took;
  }
  const avgHitTime = hitTime / hitSearchTerms.length;
  const avgMissTime = missTime / missSearchesTerms.length;
  console.log(`Open Search: Average hit time: ${avgHitTime}`);
  console.log(`Open Search Average miss time: ${avgMissTime}`);
  return { avgHitTime, avgMissTime };
};

const run = async () => {
  // await createIndex(client, indexName); // throws resourse_already_exists_exception
  // await addDocuments(client, indexName);
  const str = "he?o";
  const res = await searchOne(client, indexName, str);
  console.log(res.hits.hits[0]);
  // await deleteAllDocuments(client, indexName);
  // await deleteIndex(client, indexName);
  // runSearch(client, indexName);
};
// run();
module.exports = { runSearch, indexName, client };

// docker-compose up
