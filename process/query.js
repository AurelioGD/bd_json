const fs = require("fs");
const va = require("./validations");

function Select(table, condition, ...columns) {
  if (va.vaParam(table) && va.vaParam(condition)&&va.vaArrayString(columns)) {
    let newVaCondition = va.vaCondition(condition);
    if (newVaCondition) {
      console.log("la condicion esta al 100");
      console.log(newVaCondition);
    } else {
      console.log(
        "ERROR SELECT: Format of the incorrect condition, Valid format: (Column to validate)(Space)(Relational operator)(Space)(Value to compare)"
      );
    }
  }
}

module.exports = {
  Select,
};
