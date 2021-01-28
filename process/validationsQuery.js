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

function basicModelWC(table, columns) {
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let newdata = [];
    for (let i = 0; i < data.length; i++) {
      newdata.push({});
      for (let c = 0; c < columns.length; c++) {
        for (let prop in data[i]) {
          if (columns[c] === prop) {
            newdata[i][prop] = data[i][prop];
          }
        }
      }
    }
    return newdata;
  }
}
function interModle(table, condition) {
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let getparam = va.vaCondition(condition);
    let framcondition = va.cmplCondition(condition);
    let newdata=data.filter(function(el){
      let param = el[getparam];
      if(eval(`${param}${framcondition}`)){
        return el;
      }
    })
    return newdata;
  }
}
function interModleWTs(table, condition, columns) {
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let newdata = [];
    let ci = 0;
    let getparam = va.vaCondition(condition);
    let framcondition = va.cmplCondition(condition);
    for (let i = 0; i < data.length; i++) {
      let param = data[i][getparam];
      if (eval(`${param}${framcondition}`)) {
        newdata.push({});

        for (let c = 0; c < columns.length; c++) {
          for (let prop in data[i]) {
            if (columns[c] === prop) {
              newdata[ci][prop] = data[i][prop];
            }
          }
        }
        ci++;
      }
    }
    return newdata;
  }
}
function deleteModel(table,condition){
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let newdata = [];
    let ci = 0;
    let getparam = va.vaCondition(condition);
    let framcondition = va.cmplCondition(condition);
    for (let i = 0; i < data.length; i++) {
      let param = data[i][getparam];
      if (!eval(`${param}${framcondition}`)) {
        newdata.push({});

        for (let prop in data[i]) {
          newdata[ci][prop] = data[i][prop];
        }
        ci++;
      }
    }
    fs.writeFileSync(`./data/databases/${statusBD}/${table}.json`,JSON.stringify(newdata))
    console.log("Se elimino correctamente..")
  }
}

function insertModle(table,columns,values){
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let newdata={}
    for(let c=0;c<columns.length;c++){
      if(c===0){
        
        newdata['id']=`${data.length+1}`;
      }
      newdata[columns[c]]=values[c];
    }
    data.push(newdata);
    fs.writeFileSync(`./data/databases/${statusBD}/${table}.json`,JSON.stringify(data));
    return "Los datos se insertaron correctamente...";

  }
  
}

function updateModle(table,condition,columns,values){
  if (!fs.existsSync(`./data/databases/${statusBD}`)) {
    console.log("ERROR BD: not selected or not exist.");
  } else if (fs.existsSync(`./data/databases/${statusBD}/${table}.json`)) {
    let data = JSON.parse(
      fs.readFileSync(`./data/databases/${statusBD}/${table}.json`)
    );
    let i=0;
    let getparam = va.vaCondition(condition);
    let framcondition = va.cmplCondition(condition);
    let newdata=data.filter(function(el){
      let param = el[getparam];
      if(eval(`${param}${framcondition}`)){
        for(let colum of columns){
          el[colum]=values[i];
          i++;
        }
        return el;
      }
      return el;
    })
    fs.writeFileSync(`./data/databases/${statusBD}/${table}.json`,JSON.stringify(newdata));
    console.log("Se actualizo la tabla correctamente")
  }

  
}



module.exports = {
  basicModel,
  basicModelWC,
  interModle,
  interModleWTs,
  deleteModel,
  insertModle,
  updateModle
};
