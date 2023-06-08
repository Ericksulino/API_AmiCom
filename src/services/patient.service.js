const Patient = require("../models/patient");

const create = (body) => Patient.create(body);

const findByCPF = (cpf) => Patient.findOne({cpf}).populate("clinics");

const findByToken = (token) => Patient.findOne({token}).populate("clinics")

const findById = (_id) => Patient.findById({_id}).populate("clinics");

const findAll = () => Patient.find().populate("clinics");

const findAllByStatus = (status) => Patient.find({status}).populate("clinics");

const addClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $push: { clinics: id_clinic } },{ new: true });

const delClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $pull: { clinics: id_clinic} },{ new: true });

const updatePatientStatus = async (clinicId, patientId, newStatus) =>
  await Patient.findByIdAndUpdate(
    patientId,
    { $set: { "clinics.$[elem].status": newStatus } },
    { new: true, arrayFilters: [{ "elem._id": clinicId }] }
  );

const findClincInPatient = (id_patient,name) => Clinic.findOne({id_patient, clinics:name});

const update = (_id,token,cpf,name,sus,birthday,priority,status) => 
Patient.findByIdAndUpdate({_id},
  {token,cpf,name,sus,birthday,priority,status},
  { new: true });

const erase = (_id) => Patient.findByIdAndRemove({_id},{ new: true });

module.exports = {
    create,
    findByCPF,
    findByToken,
    findById,
    findAll,
    findAllByStatus,
    addClinic,
    delClinic,
    updatePatientStatus,
    findClincInPatient,
    update,
    erase
}