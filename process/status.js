const fs = require("fs");
const va = require("./validations");


function getStatus() {
  va.creatstatusjson();
  return JSON.parse(fs.readFileSync("./process/settings.json"));
}

function setStatus(name) {
  const statusBD = getStatus();
  let namestatus = va.vaParam(name);
  if (!namestatus === false) {
    statusBD.status = namestatus;
    fs.writeFileSync("./process/settings.json", JSON.stringify(statusBD));
    console.log("Se a cambiado el status exitosamente")
  }
}
module.exports = {
    getStatus,
    setStatus
};

