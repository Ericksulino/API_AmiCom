const route = require("express").Router();
const clincControler = require("../controllers/clinic.controller");

route.post("/",clincControler.create);


route.get("/",clincControler.findAll);

route.get("/:name",clincControler.findClinic);

route.patch("/:name/:id_patient",clincControler.addPatient);

route.delete("/:name/:id_patient",clincControler.removePatient);
/*
route.patch("/:name",clincControler.patch);

route.delete("/:name",clincControler.erase);
*/

module.exports = route;