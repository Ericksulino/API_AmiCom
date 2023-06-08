const Clinic = require("../models/clinic");

const create = (body) => Clinic.create(body);

const findAll = () => Clinic.find().populate("event").populate("patients");

const findAllByEvent = (event) => Clinic.find({event}).populate("event").populate("patients");

const findByName = (name) => Clinic.findOne({name:name}).populate("event").populate("patients");

const findById = (_id) => Clinic.findById({_id}).populate("event").populate("patients");

const addPatient = (_id,id_patient, token) => Clinic.findByIdAndUpdate({_id:_id},{ $push: { patients: {_id: id_patient, status: "espera", token: token}} },{ new: true });

const delPatient = (_id,id_patient) => Clinic.findByIdAndUpdate({_id:_id},{ $pull: { patients: id_patient} },{ new: true });

const findPatientInClinc = (name,id_patient) => Clinic.findOne({name, patients: id_patient});

const update = (_id,name, vacancies, specialty, appointment_max, appointment_count, open) => 
Clinic.findByIdAndUpdate( {_id},
  {name, vacancies, specialty, appointment_max, appointment_count, open},
  {new: true}
)

const erase = (_id) => Clinic.findByIdAndRemove(_id);

module.exports = {
    create,
    findAll,
    findAllByEvent,
    findByName,
    findById,
    addPatient,
    delPatient,
    findPatientInClinc,
    update,
    erase
}