const bd=require("./process/bd_json")


console.log(bd.query.Insert("peliculas",["title","year","IMDb","description","director"],["Sightless","2020","5.5","Después de que un ataque la deja ciega, Ellen se retira del mundo para recuperarse. Pero pronto se sumerge en la paranoia, incapaz de convencer a nadie de que su agresor ha vuelto para aterrorizarla ocultándose a plena vista.","Cooper Karl"]));





