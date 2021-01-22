const fs=require("fs")

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

function vaArrayString(array){
  let value;
  array.forEach((el)=>{
    if(!vaParam(el)){
      value=false;
    }
  });
  if(value===false){
    return false
  }else{
    return true;
  }
  
}

  function creatstatusjson(){
    if(fs.existsSync("process/settings.json")){
      return false;
    }else{
      fs.writeFileSync("process/settings.json",`{"status":null}`);
      return true;
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

  function vaCondition(condition){
    let newCondition=condition.split(" ");
    if(newCondition.length===3){
        return newCondition[0];
    }else{
        return false;
    }
}
  module.exports={
    vaParam,
    creatstatusjson,
    creatdir,
    vaCondition,
    vaArrayString
  }