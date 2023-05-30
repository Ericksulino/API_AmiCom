const route = require("express").Router();
const patientControler = require("../controllers/patient.controller");
const {validPatient} = require("../middlewares/patient.middleware");

route.post("/",patientControler.create);

route.get("/",patientControler.findAll);

route.get("/cpf/:cpf",patientControler.findByCPF);

route.get("/:token",validPatient,patientControler.findByToken);

route.get("/token/:token",validPatient,patientControler.findByToken);

module.exports = route;