// // // "use strict";

// // const host = "localhost";
// // const protocol = "https";
// // const port = 9200;
// // const auth = "admin:admin"; // For testing only. Don't store credentials in code.

// // // Create a client with SSL/TLS enabled.
// // const { Client } = require("@opensearch-project/opensearch");
// // const fs = require("fs");
// // const client = new Client({
// //   node: protocol + "://" + auth + "@" + host + ":" + port,
// //   ssl: {
// //     rejectUnauthorized: false,
// //   },
// // });

// // const indexName = "books"; //Index name for the db

// // const createIndex = async (client, indexName) => {
// //   console.log("Creating index:");
// //   const settings = {
// //     settings: {
// //       index: {
// //         number_of_shards: 4,
// //         number_of_replicas: 3,
// //       },
// //     },
// //   };
// //   const response = await client.indices.create({
// //     index: indexName,
// //     body: settings,
// //   });
// //   console.log("Index created successfully...");
// //   // console.log(response.body);
// // };

// // const addDocument = async (client, indexName, id) => {
// //   const document = {
// //     title: "pThe Outsider",
// //     author: "Stephen King",
// //     year: "2018",
// //     genre: "Crime fiction",
// //     email: "shadab@gmail.com",
// //   };
// //   console.log("Adding document:");
// //   const response = await client.index({
// //     index: indexName,
// //     body: document,
// //   });
// //   console.log("Data inserted successfully");
// // };

// // const searchDocument = async (client, indexName) => {
// //   const query = {
// //     query: {
// //       wildcard: {
// //         title: {
// //           value: "*the*",
// //         },
// //       },
// //     },
// //   };
// //   console.log("Search results:");
// //   const response = await client.search({
// //     index: indexName,
// //     body: query,
// //   });
// //   console.log(response.body.hits.hits[0]);
// //   console.log("Success: search");
// // };

// // await createIndex();
// // // await addDocument();
// // // await searchDocument();

// const createIndexOnField = async (client, indexName) => {
//   console.log("Creating index:");
//   const mapping = {
//     mappings: {
//       properties: {
//         title: {
//           type: "text", // Specify the data type of the field
//           analyzer: "standard", // Specify the analyzer for text analysis
//         },
//         // Define other fields here
//       },
//     },
//   };

//   const settings = {
//     settings: {
//       index: {
//         number_of_shards: 4,
//         number_of_replicas: 3,
//       },
//     },
//     mappings: mapping.mappings,
//   };

//   const response = await client.indices.create({
//     index: indexName,
//     body: settings,
//   });

//   console.log("Index created successfully...");
// };
