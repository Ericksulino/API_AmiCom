const patientService = require("../services/patient.service");

const validPatient = async (req,res,next) =>{
    const {token} = req.params;
    const patient = await patientService.findByToken(token);
    if(!patient){
        return res.status(400).send({message:"Paciente inexixtente!"});
    }
    req.patient = patient;
    next();
}

const validPatientById = async (req,res,next) =>{
    const {id} = req.params;
    const patient = await patientService.findById(id);
    if(!patient){
        return res.status(400).send({message:"Paciente inexixtente!"});
    }
    req.patient = patient;
    next();
}

module.exports = {
    validPatient,
    validPatientById
}