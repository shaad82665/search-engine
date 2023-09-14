const axios = require("axios");
const btoa = require("btoa");

const baseUrl = "http://localhost:4080/api";

const username = "admin";
const password = "Complexpass#123";

const request = async (method, data, url, absolute = false) => {
  url = !absolute ? `${baseUrl}/${url}` : url;
  const res = await axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  const zincRes = res.data;
};

module.exports = request;
