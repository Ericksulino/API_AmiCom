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
                        cpf: patient.cpf,
                        name: patient.name,
                        token: patient.token,
                        priority: patient.priority,
                        status:patient.status
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
        const clinic = req.clinic;
            
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
                        cpf: patient.cpf,
                        token: patient.token,
                        name: patient.name,
                        priority: patient.priority,
                        clinic_status: patient.clinc_status
                    }))
                    
                }
            })

    }catch(err){
        res.status(500).send({message: err.message});
    }
}


const addPatient = async (req,res) =>{
    try{
            const clinic = req.clinic;
            const patient = req.patient;
            const patientInClinic = await clincService.findPatientInClinc(clinic.name,patient._id);
            if(patientInClinic){
                res.status(400).send({message:"Paciente Já cadastrado no consultório!"});
            }else{
            try{
                const newPatientClinic = await clincService.addPatient(clinic._id,patient._id);
                const newClinicPatient = await patientService.addClinic(patient._id,clinic._id);
                if(!newClinicPatient || !newPatientClinic){
                    res.status(400).send({message:"Erro ao adicionar Paciente no Consultório"});
                }else{
                    await clincService.update(clinic._id,clinic.name,clinic.vacancies-1, clinic.specialty, clinic.appointment_max,clinic.appointment_count+1,clinic.open);
                    res.status(201).send({message:"Paciente adicionado com sucesso no Consultório!"});
                }
            }catch(err){
                res.status(500).send({message: err.message});
            }}
            

    } catch(err){
        res.status(500).send({message: err.message});
    }
}

const delPatient = async(req,res) => {
    try{
        const clinic = req.clinic;
        const patient = req.patient;
       if(!patient){
            res.status(400).send({message:"Paciente inexixtente!"});
        }else{
            const patientInClinic = await clincService.findPatientInClinc(clinic.name,patient._id);
            if(!patientInClinic){
                res.status(400).send({message:"Paciente não está no consultório!"})
            }else{
                const resPatient = await patientService.delClinic(patient._id,clinic._id);
                const resClinc = await clincService.delPatient(clinic._id,patient._id);
                if(!resClinc || !resPatient){
                    res.status(400).send({message:"Erro ao remover Paciente do Consultório"});
                }else{
                    await clincService.update(clinic._id,clinic.name,clinic.vacancies+1, clinic.specialty, clinic.appointment_max,clinic.appointment_count-1,clinic.open);
                    res.status(201).send({message:"Paciente removido com sucesso no Consultório!"});
                }
            }
        }
       

     } catch(err){
        res.status(500).send({message: err.message});
    }
}

const update = async (req,res) =>{
    try{
        const {name, vacancies, specialty, appointment_max, appointment_count, open} = req.body;
        const clinic = req.clinic;
        if(!name && !vacancies && !specialty && appointment_max == undefined && appointment_count == undefined && open == undefined){
            res.status(400).send({message:"Envie pelo menos um campo para a atualização!"});
        } else{
                
                try{
                    const newClinic = await clincService.update(clinic._id,name, vacancies, specialty, appointment_max, appointment_count, open);
                    if(!newClinic){
                        res.status(400).send({message:"Erro ao editar consultório!"})
                    }else{
                        res.status(201).send({
                            message: "Consultório editado com sucesso!",
                            clinic: {
                                id: newClinic._id,
                                name: newClinic.name, 
                                vacancies: newClinic.vacancies, 
                                specialty: newClinic.specialty, 
                                appointment_max: newClinic.appointment_max, 
                                appointment_count: newClinic.appointment_count, 
                                open: newClinic.open
                            }
                        })
                    }
                }catch(err){
                    res.status(500).send({message: err.message});
                }
            }
    } catch(err){
        res.status(500).send({message: err.message});
    }
}


const erase = async (req,res) =>{
    try{
        const clinic = req.clinic;
        await clincService.erase(clinic._id);
        res.status(200).send({message: "Consultório removido com sucesso!"});
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    create,
    findAll,
    findClinic,
    addPatient,
    delPatient,
    update,
    erase
}