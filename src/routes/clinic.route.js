const route = require("express").Router();
const clincControler = require("../controllers/clinic.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {validClinic,validClinicByName} = require("../middlewares/clinic.middleware")
const {validPatient} = require("../middlewares/patient.middleware");
const {validEventByName} = require("../middlewares/event.middleware");

route.post("/",validEventByName,clincControler.create);

route.get("/",clincControler.findAll);

route.get("/:name",validClinicByName,clincControler.findClinic);

route.post("/:name/:token",validClinicByName,validPatient,clincControler.addPatient);

route.delete("/:name/:token",validClinicByName,validPatient,clincControler.delPatient);

route.patch("/:name",validClinicByName,clincControler.update);

route.delete("/:id",validClinic,clincControler.erase);

module.exports = route;