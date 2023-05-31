const route = require("express").Router();
const patientControler = require("../controllers/patient.controller");
const {validPatient,validPatientById} = require("../middlewares/patient.middleware");
const {validEventByName} = require("../middlewares/event.middleware");

route.post("/",validEventByName,patientControler.create);

route.get("/",patientControler.findAll);

route.get("/event/:event",validEventByName,patientControler.findAllByEvent);

route.get("/cpf/:cpf",patientControler.findByCPF);

route.get("/:token",validPatient,patientControler.findByToken);

route.get("/token/:token",validPatient,patientControler.findByToken);

route.patch("/:token",validPatient,patientControler.update);

route.delete("/:id",validPatientById,patientControler.erase);

module.exports = route;