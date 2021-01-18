const fs = require("fs");
const process = require("process");

function getStatus() {
  return JSON.parse(fs.readFileSync("./process/settings.json"));
}

function setStatus(namestatus) {
  const statusA = getStatus();
  statusA.status = namestatus;
  fs.writeFileSync("./process/settings.json", JSON.stringify(statusA));
}

function newBD(namebd) {
  fs.mkdirSync(`./data/databases/${namebd}`);
}

function newTable(nametable) {
  if (statusBD === null) {
    console.log("BD not selected");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${nametable}.json`)) {
    console.log(`BD: ${statusBD}\n${nametable}.json already exists`);
  } else {
    fs.writeFile(
      `./data/databases/${statusBD}/${nametable}.json`,
      "[]",
      function (error) {
        if (error) console.log(error);
        else console.log(`BD: ${statusBD}\nTable created: ${nametable}`);
      }
    );
  }
}
module.exports = {
  newBD,
  newTable,
  getStatus,
  setStatus,
};
