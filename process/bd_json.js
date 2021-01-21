const fs = require("fs");
const va=require("./validations")
const query=require("./query")


function getStatus() {
  vs.creatstatusjson();
  return JSON.parse(fs.readFileSync("./process/settings.json"));
}

function setStatus(name) {
  const statusBD = getStatus();
  let namestatus=va.vaParam(name);
  if(!namestatus===false){
    statusBD.status = namestatus;
    fs.writeFileSync("./process/settings.json", JSON.stringify(statusBD));
  }
  
}

function newBD(name) {
  let namebd=va.vaParam(name);
  va.creatdir();
  if(!namebd===false){
    if (fs.existsSync(`./data/databases/${namebd}`)) {
      console.log("ERROR BD: db already exists.");
    }else {
      fs.mkdirSync(`./data/databases/${namebd}`);
    }
  }
}

function newTable(name) {
  let statusBD=getStatus().status;
  let nametable=va.vaParam(name);
  if(!nametable===false){
    if (!fs.existsSync(`./data/databases/${statusBD}`)) {
      console.log("ERROR BD: not selected or not exist.");
    } else if (fs.existsSync(`./data/databases/${statusBD}/${nametable}.json`)) {
      console.log(`ERROR BD: ${statusBD}\n${nametable}.json already exists.`);
    } else {
      fs.writeFile(
        `./data/databases/${statusBD}/${nametable}.json`,
        "{}",
        function (error) {
          if (error) console.log(error);
          else console.log(`BD: ${statusBD}\nTable created: ${nametable}`);
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
  query
};
