const fs = require("fs");
const va=require("./validations")
const query=require("./query")
const status=require("./status")


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
  let statusBD=status.getStatus().status;
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
  query,
  status
};
