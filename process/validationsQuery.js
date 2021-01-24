const fs = require("fs");
const status = require("./status");
const va = require("./validations");
let statusBD = status.getStatus().status;

function basicModel(table) {
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    return JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
  }
}

function basicModelWC(table,columns) {
    if (!fs.existsSync(`./data/databases/${statusBD}`)) {
        console.log("ERROR BD: not selected or not exist.");
      } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
        let data=JSON.parse(fs.readFileSync(`./data/databases/${statusBD}/${table}.json`));
        let newdata=[];
        for(let i=0;i<data.length;i++){
            newdata.push({});
            for(let c=0;c<columns.length;c++){
                for(let prop in data[i]){
                    if(columns[c]===prop){
                        newdata[i][prop]=data[i][prop]
                    }
                }
            }
        }
        return newdata;
        
      }
}

module.exports = {
  basicModel,
  basicModelWC
};
