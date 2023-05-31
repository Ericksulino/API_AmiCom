const Event = require("../models/event");

const create = (body) => Event.create(body);

const findAll = (body) => Event.find().populate("clinics","patients");

const findById = (_id) => Event.findById({_id}).populate("clinics","patients");

const findByName = (name) => Event.findOne({name}).populate("clinics","patients");

const addPatient = (_id,id_patient) => Clinic.findByIdAndUpdate({_id:_id},{ $push: { patients: {_id: id_patient}} },{ new: true });

const delPatient = (_id,id_patient) => Clinic.findByIdAndUpdate({_id:_id},{ $pull: { patients: id_patient} },{ new: true });

const addClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $push: { clinics: id_clinic } },{ new: true });

const delClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $pull: { clinics: id_clinic} },{ new: true });

const update = (_id,name,date) => Event.findOneAndUpdate({_id},{name,date},{new:true});

const erase = (_id) => Event.findByIdAndRemove(_id);

module.exports ={
    create,
    findAll,
    findById,
    findById,
    findByName,
    addPatient,
    delPatient,
    addClinic,
    delClinic,
    update,
    erase
}
