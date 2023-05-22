const route = require("express").Router();
const patientControler = require("../controllers/patient.controller");

route.post("/",patientControler.create);

route.get("/",patientControler.findAll);

route.get("/:id_patient",patientControler.findByIdPati);

route.get("/:fixa_n",patientControler.findByIdFix);

module.exports = route;