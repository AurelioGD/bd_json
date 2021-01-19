const fs = require("fs");
const process = require("process");

function getStatus() {
  return JSON.parse(fs.readFileSync("./process/settings.json"));
}

function setStatus(namestatus) {
  const statusBD = getStatus();
  statusBD.status = namestatus;
  fs.writeFileSync("./process/settings.json", JSON.stringify(statusBD));
}

function newBD(namebd) {
  fs.mkdirSync(`./data/databases/${namebd}`);
}

function newTable(name) {
  let statusBD=getStatus().status;
  if(typeof(name)!=='string'){
    console.log("ERROR BD: invalid data type.");
  }else{
    let nametable=name.trim().replace(/ /g, "_");
    if(nametable===""){
      console.log("ERROR BD: Invalid name")
    }else if (!fs.existsSync(`./data/databases/${statusBD}`)) {
      console.log("ERROR BD: not selected or not exist.");
    } else if (fs.existsSync(`./data/databases/${statusBD}/${nametable}.json`)) {
      console.log(`ERROR BD: ${statusBD}\n${nametable}.json already exists.`);
    } else {
      fs.writeFile(
        `./data/databases/${statusBD}/${nametable}.json`,
        "[]",
        function (error) {
          if (error) console.log(error);
          else console.log(`BD message: ${statusBD}\nTable created: ${nametable}`);
        }
      );
    }
  }
  
}
module.exports = {
  newBD,
  newTable,
  getStatus,
  setStatus,
};
