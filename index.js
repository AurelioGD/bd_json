const bd=require("./process/bd_json")

console.log(bd.query.Select("peliculas","id == 3","title","description","year"))





