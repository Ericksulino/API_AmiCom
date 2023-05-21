const Clinic = require("../models/clinc");

const create = (body) => Clinic.create(body);

const findAll = () => Clinic.find().populate("patients");

const findByName = (name) => Clinic.findOne({name:name}).populate("patients");

const addPatient = (_id,id_patient) => Clinic.findByIdAndUpdate({_id:_id},{ $push: { patients: id_patient } },{ new: true });

const removePatient = (_id,id_patient) => Clinic.findByIdAndRemove({_id:_id},{ $pull: { patients: id_patient } },{ new: true });

const findPatientInClinc = (name,id_patient) => Clinic.findOne({name, patients: id_patient});

module.exports = {
    create,
    findAll,
    findByName,
    addPatient,
    removePatient,
    findPatientInClinc
}