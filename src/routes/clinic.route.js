const route = require("express").Router();
const clincControler = require("../controllers/clinic.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.post("/",clincControler.create);

route.get("/",clincControler.findAll);

route.get("/:name",clincControler.findClinic);

route.post("/:name/:id_patient",clincControler.addPatient);

route.patch("/:name/:id_patient",clincControler.statusPatient);

route.patch("/:id",clincControler.update);

route.delete("/:id",clincControler.erase);

module.exports = route;