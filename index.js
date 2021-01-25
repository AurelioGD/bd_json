const bd=require("./process/bd_json")

console.log(bd.query.Select("peliculas","year > 2017","*"))





