const Event = require("../models/event");

const create = (body) => Event.create(body);

const findAll = (body) => Event.find().populate("clinics");

const findById = (_id) => Event.findById({_id}).populate("clinics");

const findByName = (name) => Event.findOne({name}).populate("clinics");

const findPatientInEvent = (_id,token) => Event.findOne({_id, patients: token});

const addPatient = (_id,id_patient) => Event.findByIdAndUpdate({_id:_id},{ $push: { patients: id_patient} },{ new: true });

const delPatient = (_id,id_patient) => Event.findByIdAndUpdate({_id:_id},{ $pull: { patients: id_patient} },{ new: true });

const findClinicInEvent = (_id,name) => Event.findOne({_id, clinics: name});

const addClinic = (_id,id_clinic) => Event.findByIdAndUpdate({_id:_id},{ $push: { clinics: id_clinic } },{ new: true });

const delClinic = (_id,id_clinic) => Event.findByIdAndUpdate({_id:_id},{ $pull: { clinics: id_clinic} },{ new: true });

const update = (_id,name,date) => Event.findOneAndUpdate({_id},{name,date},{new:true});

const erase = (_id) => Event.findByIdAndRemove(_id);

module.exports ={
    create,
    findAll,
    findById,
    findById,
    findByName,
    findClinicInEvent,
    findPatientInEvent,
    addPatient,
    delPatient,
    addClinic,
    delClinic,
    update,
    erase
}
