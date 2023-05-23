const route = require("express").Router();
const patientControler = require("../controllers/patient.controller");

route.post("/",patientControler.create);

route.get("/",patientControler.findAll);

route.get("/:cpf",patientControler.findByCPF);

route.get("/token/:token",patientControler.findByToken);

module.exports = route;