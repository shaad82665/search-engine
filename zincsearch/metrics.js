const request = require("./request");

const run = async () => {
  const res = await request("get", {}, "http://localhost:4080/metrics", true);
};

run();
