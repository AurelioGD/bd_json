const fs = require("fs");
const process = require("process");
//cat > ${a}.json
function newBD(namebd){
  fs.writeFile(`./${namebd}.json`, "[]", function (error) {
    if (error) console.log(error);
    else console.log("El archivo fue creado");
  });
}

