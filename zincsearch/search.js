const request = require("./request");
const movies = require("../movies.json");

const titles = [];
const getHitArray = (n = 500) => {
  const base = 10;
  for (let i = 0; i < n; i++) {
    const dex = Math.ceil(Math.random() * 101 + base);
    const { title } = movies[dex];
    titles.push(title);
  }
};
getHitArray(500);

const data = {
  search_type: "match",
  query: {
    term: "hero",
    field: "_all",
  },
};

const run = async (data) => {
  const res = await request("post", data, "movies/_search");
};

for (let i = 0; i < titles.length; i++) {
  data.query.term = titles[i];
  // console.log(data.query.term);
  run(data);
}
console.log(`Searched ${titles.length} terms`);
console.log(
  "REQUEST curl -X GET -u <usernam>:<password> http://localhost:4080/metrics for more information"
);
