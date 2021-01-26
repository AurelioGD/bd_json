const fs = require("fs");
const va = require("./validations");
const vaQ = require("./validationsQuery");

function Select(table, condition, ...columns) {
  if (condition) {
    if (
      va.vaParam(table) &&
      va.vaParam(condition) &&
      va.vaArrayString(columns)
    ) {
      let newVaCondition = va.vaCondition(condition);
      if (newVaCondition) {
        if (columns[0] === "*") {
          return vaQ.interModle(table, condition);
        } else {
          return vaQ.interModleWTs(table, condition, columns);
        }
      } else {
        console.log(
          "ERROR SELECT: Format of the incorrect condition, Valid format: (Column to validate)(Space)(Relational operator)(Space)(Value to compare)"
        );
      }
    }
  } else {
    if (va.vaParam(table) && va.vaArrayString(columns)) {
      if (columns[0] === "*") {
        return vaQ.basicModel(table);
      } else {
        return vaQ.basicModelWC(table, columns);
      }
    } else {
      console.log(
        "ERROR SELECT: Format of the incorrect condition, Valid format: (Column to validate)(Space)(Relational operator)(Space)(Value to compare)"
      );
    }
  }
}
function Insert(){

}
function Update(){
  
}
function Delete(table, condition) {
  if (condition) {
    if (va.vaParam(table) && va.vaParam(condition)) {
      let newVaCondition = va.vaCondition(condition);
      if (newVaCondition) {
          return vaQ.deleteModel(table,condition);
      } else {
        console.log(
          "ERROR SELECT: Format of the incorrect condition, Valid format: (Column to validate)(Space)(Relational operator)(Space)(Value to compare)"
        );
      }
    }
  } else {
    console.log(
      "ERROR SELECT: there is no condition"
    );
  }
}

module.exports = {
  Select,
  Delete
};
