const route = require("express").Router();
const histController = require("../controllers/hist.controller");
const {validPatient} = require("../middlewares/patient.middleware");
const {validClinicByName} = require("../middlewares/clinic.middleware");
const {validEventByName} = require("../middlewares/event.middleware");

route.get("/",histController.findAll);

route.get("/patient/:token",validPatient,histController.findPatient);

route.get("/clinic/:name",validClinicByName,histController.findClinic);

route.get("/event/:event",validEventByName,histController.findEvent);

module.exports = route;