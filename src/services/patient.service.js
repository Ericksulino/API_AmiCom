const Patient = require("../models/patient");

const create = (body) => Patient.create(body);

const findByIdPati = (id_patient) => Patient.findOne({id_patient}).populate("clinics");

const findByFix = (fixa_n) => Patient.findOne({fixa_n}).populate("clinics");

const findAll = () => Patient.find().populate("clinics");

const addClinic = (_id,id_clinic) => Patient.findByIdAndUpdate({_id:_id},{ $push: { clinics: id_clinic } },{ new: true });

const updatePatientStatus = async (clinicId, patientId, newStatus) =>
  await Patient.findByIdAndUpdate(
    patientId,
    { $set: { "clinics.$[elem].status": newStatus } },
    { new: true, arrayFilters: [{ "elem._id": clinicId }] }
  );

const findClincInPatient = (id_patient,name) => Clinic.findOne({id_patient, clinics:name});

module.exports = {
    create,
    findByIdPati,
    findByFix,
    findAll,
    addClinic,
    updatePatientStatus,
    findClincInPatient
}