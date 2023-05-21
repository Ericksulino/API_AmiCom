const route = require("express").Router();
const patientControler = require("../controllers/patient.controller");

route.post("/",patientControler.create);

route.get("/",patientControler.findAll);

route.get("/:id_patient",patientControler.findByIdPati)

module.exports = route;