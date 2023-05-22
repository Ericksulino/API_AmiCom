const Clinic = require("../models/clinc");

const create = (body) => Clinic.create(body);

const findAll = () => Clinic.find().populate("patients");

const findByName = (name) => Clinic.findOne({name:name}).populate("patients");

const findById = (_id) => Clinic.findById({_id}).populate("patients");

const addPatient = (_id,id_patient) => Clinic.findByIdAndUpdate({_id:_id},{ $push: { patients: id_patient } },{ new: true });

const updatePatientStatus = async (clinicId, patientId, newStatus) =>
  await Clinic.findByIdAndUpdate(
    clinicId,
    { $set: { "patients.$[elem].status": newStatus } },
    { new: true, arrayFilters: [{ "elem._id": patientId }] }
  );

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
    findByName,
    findById,
    addPatient,
    updatePatientStatus,
    findPatientInClinc,
    update,
    erase
}