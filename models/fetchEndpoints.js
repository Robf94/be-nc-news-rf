const fs = require("fs/promises");

function fetchEndpoints() {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((endpoints) => {
    const parsedEndpoints = JSON.parse(endpoints);
    return parsedEndpoints;
  });
}

module.exports = fetchEndpoints;
