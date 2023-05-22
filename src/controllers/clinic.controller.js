const clincService = require("../services/clinic.service");
const patientService = require("../services/patient.service");

const create = async (req,res) =>{
    try{
        //console.log(req.body)
        
        const {name, vacancies, specialty, appointment_max, appointment_count, open} = req.body;

        if(!name || !vacancies || !specialty || appointment_max == undefined || open == undefined){
            res.status(400).send({message:"Envie todos os campos para o registro!"});
        } else{
            
            const clincExist = await clincService.findByName(name);
            if(clincExist){
                res.status(400).send({message:"Nome de consultório já cadastrado!"});
            }
            else{

                try{
                    const clinic = await clincService.create(req.body);
                    if(!clinic){
                        res.status(400).send({message:"Erro ao criar consultório!"})
                    }else{
                        res.status(201).send({
                            message: "Consultório criado com sucesso!",
                            clinic: {
                                id: clinic._id,
                                name, 
                                vacancies, 
                                specialty, 
                                appointment_max, 
                                appointment_count, 
                                open
                            }
                        })
                    }
                }catch(err){
                    res.status(500).send({message: err.message});
                }
            }
            
        }

    } catch(err){
        res.status(500).send({message: err.message});
    }
}

const findAll = async (req, res) =>{
    try{
        const clinics = await clincService.findAll();
        if(clinics.length == 0){
            return res.status(400).send({message: "Não há consultórios cadastrados"});
        }else{
            res.status(200).send({
                clinics: clinics.map(i =>{
                    return {
                    id : i._id,
                    name : i.name,
                    vacancies: i.vacancies,
                    specialty: i.specialty,
                    appointment_max: i.appointment_max,
                    appointment_count: i.appointment_count,
                    open: i.open,
                    patients: i.patients.map(patient => ({
                        id_patient: patient.id_patient,
                        fixa_n: patient.fixa_n,
                        name: patient.name,
                        priority: patient.priority,
                        busy: patient.busy,
                        status: patient.status
                    }))
                    }
                })
            })
        }

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const findClinic = async(req,res) =>{
    try{
        const {name} = req.params;
        const clinic = await clincService.findByName(name);
        if(!clinic){
            return res.status(400).send({message: "Não há consultório cadastrado com esse nome"});
        }else{
            res.status(200).send({
                clinic: {
                    id : clinic._id,
                    name : clinic.name,
                    vacancies: clinic.vacancies,
                    specialty: clinic.specialty,
                    appointment_max: clinic.appointment_max,
                    appointment_count: clinic.appointment_count,
                    open: clinic.open,
                    patients: clinic.patients.map(patient => ({
                        id_patient: patient.id_patient,
                        fixa_n: patient.fixa_n,
                        name: patient.name,
                        priority: patient.priority,
                        busy: patient.busy,
                        status: patient.status
                    }))
                    
                }
            })
        }

    }catch(err){
        res.status(500).send({message: err.message});
    }
}

const addPatient = async (req,res) =>{
    try{
        const {name,id_patient} = req.params;
        const clinic = await clincService.findByName(name);
        const patient = await patientService.findByIdPati(id_patient);
        if(!clinic){
            res.status(400).send({message:"Consultório inexistente!"});
        }else if(!patient){
            res.status(400).send({message:"Paciente inexixtente!"});
        }else{
            const patientInClinic = await clincService.findPatientInClinc(name,patient._id);
            if(patientInClinic){
                res.status(400).send({message:"Paciente Já cadastrado no consultório!"});
            }else if(clinic.appointment_count == clinic.appointment_max){
                res.status(400).send({message:"Não há vagas no consultório!"});
            }else{
            try{
                const newPatientClinic = await clincService.addPatient(clinic._id,patient._id);
                const newClinicPatient = await patientService.addClinic(patient._id,clinic._id);
                if(!newClinicPatient || !newPatientClinic){
                    res.status(400).send({message:"Erro ao adicionar Paciente no Consultório"});
                }else{
                    res.status(201).send({message:"Paciente adicionado com sucesso no Consultório!"});
                }
            }catch(err){
                res.status(500).send({message: err.message});
            }}
            
        } 

    } catch(err){
        res.status(500).send({message: err.message});
    }
}

const statusPatient = async(req,res) => {
    try{
        const {name,id_patient} = req.params;
        const {status} = req.body;
        const patient = await patientService.findByIdPati(id_patient);
        const clinc =  await clincService.findByName(name);
       if(!patient){
            res.status(400).send({message:"Paciente inexixtente!"});
        }else{
            const patientInClinic = await clincService.findPatientInClinc(name,patient._id);
            if(!patientInClinic){
                res.status(400).send({message:"Paciente não está no consultório!"})
            }else{
                const resPatient = await patientService.updatePatientStatus(clinc._id,patient._id,status);
                const resClinc = await clincService.updatePatientStatus(clinc._id,patient._id,status);
                if(!resPatient || !resClinc){
                    res.status(400).send({message:"Erro ao remover Paciente do Consultório"});
                }else{
                    res.status(201).send({message:"Paciente removido com sucesso no Consultório!"});
                }
            }
        }
       

     } catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    create,
    findAll,
    findClinic,
    addPatient,
    statusPatient
}