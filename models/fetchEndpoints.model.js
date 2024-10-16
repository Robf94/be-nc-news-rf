const fs = require("fs/promises");

function fetchEndpoints() {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((endpoints) => {
    const parsedEndpoints = JSON.parse(endpoints);
    return parsedEndpoints;
  });
  // Do I need to catch any errors here?
}

module.exports = fetchEndpoints;
