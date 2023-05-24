const Clinic = require("../models/clinc");
const mongoose = require("mongoose");

const create = (body) => Clinic.create(body);

const findAll = () => Clinic.find().populate("patients");

const findByName = (name) => Clinic.findOne({name:name}).populate("patients");

const findById = (_id) => Clinic.findById({_id}).populate("patients");

const addPatient = (_id,id_patient, token) => Clinic.findByIdAndUpdate({_id:_id},{ $push: { patients: {_id: id_patient, status: "espera", token: token}} },{ new: true });

const updatePatientInClinic = async (clinicId, patientId, newStatus, newToken) => {
  const clinic = await Clinic.findById(clinicId);
  if (!clinic) {
    throw new Error('Consultório não encontrado');
  }

  // Procurar o paciente no array de pacientes
  const patientIndex = clinic.patients.findIndex(patient => patient._id.toString() === patientId);
  if (patientIndex === -1) {
    throw new Error('Paciente não encontrado no consultório');
  }

  // Atualizar os atributos do paciente
  clinic.patients[patientIndex].status = newStatus;
  clinic.patients[patientIndex].token = newToken;

  // Salvar as alterações no banco de dados
  return await clinic.save();
};


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
    updatePatientInClinic,
    findPatientInClinc,
    update,
    erase
}