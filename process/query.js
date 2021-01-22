const fs = require("fs");
const va = require("./validations");

function Select(table, condition, ...columns) {
    if(condition){
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
    }else{
        if (va.vaParam(table)&&va.vaArrayString(columns)) {
                console.log("todo al 100 pero no hay condicion");
          }
    }
  
}

module.exports = {
  Select,
};
