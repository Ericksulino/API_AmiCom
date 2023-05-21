const Patient = require("../models/patient");

const create = (body) => Patient.create(body);

const findByIdPati = (id_patient) => Patient.findOne({id_patient}).populate("clinics");

const findAll = () => Patient.find().populate("clinics");

const addClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $push: { clinics: id_clinic } },{ new: true });

const removeClinic = (_id,id_clinic) => Patient.findByIdAndRemove({_id:_id},{ $pull: { clinics: id_clinic } },{ new: true });

module.exports = {
    create,
    findByIdPati,
    findAll,
    addClinic,
    removeClinic
}