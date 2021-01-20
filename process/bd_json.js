const fs = require("fs");
const process = require("process");

function vaParam(param){
  if(typeof(param)!=='string'){
    console.log("ERROR BD: invalid data type.");
    return false;
  }else if(param===""){
    console.log("ERROR BD: Invalid name")
    return false;
  }else{
    let paramready=param.trim().replace(/ /g, "_");
    return paramready;
  }
}

function creatdir(){
  if(fs.existsSync("./data")){
    if(fs.existsSync("./data/databases")){
      return true;
    }else{
      fs.mkdirSync("./data/databases");
      return false;
    }
  }else{
    fs.mkdirSync("./data");
    fs.mkdirSync("./data/databases");
    return false;
  }
}

function getStatus() {
  return JSON.parse(fs.readFileSync("./process/settings.json"));
}

function setStatus(namestatus) {
  const statusBD = getStatus();
  statusBD.status = namestatus;
  fs.writeFileSync("./process/settings.json", JSON.stringify(statusBD));
}

function newBD(name) {
  let namebd=vaParam(name);
  if(!fs.existsSync("./data")||!fs.existsSync("./data/databases")){
    creatdir();
  }
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
  let nametable=vaParam(name);
  if(!nametable===false){
    if (!fs.existsSync(`./data/databases/${statusBD}`)) {
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
  setStatus
};
