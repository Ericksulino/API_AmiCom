const route = require("express").Router();
const clinicControler = require("../controllers/clinic.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {validClinic,validClinicByName} = require("../middlewares/clinic.middleware")
const {validPatient} = require("../middlewares/patient.middleware");
const {validEventByName} = require("../middlewares/event.middleware");

route.post("/",validEventByName,clinicControler.create);

route.get("/",clinicControler.findAll);

route.get("/event/:event",validEventByName,clinicControler.findAllByEvent);

route.get("/:name",validClinicByName,clinicControler.findClinic);

route.patch("/:name/:token",validClinicByName,validPatient,clinicControler.addPatient);

route.delete("/:name/:token",validClinicByName,validPatient,clinicControler.delPatient);

route.patch("/:name",validClinicByName,clinicControler.update);

route.delete("/:id",validClinic,clinicControler.erase);

module.exports = route;