const patientService = require("../services/patient.service");

const create = async (req, res) =>{
    try{
        const {token, name,sus,birthday,priority,status} = req.body;
        if(!token || !name || priority == undefined){
            res.status(400).send({message:"Envie todos os campos obrigatórios para o registro!"});
        }else{
            const tokenExist = await patientService.findByToken(token);
            if(tokenExist){
                res.status(400).send({message:"Paciente já cadastrado!"});
            }else{
                try{
                    const patient = patientService.create(req.body);
                    if(!patient){
                        res.status(400).send({message:"Erro ao criar Paciente!"});
                    }
                    else{
                        res.status(201).send({
                            message: "Paciente criado com sucesso!",
                            patient: {
                                token,
                                name,
                                sus,
                                birthday,
                                priority,
                                status
                            }
                        })
                    }
    
                }catch(err){
                    res.status(500).send({message: err.message});
                }
            }

        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

const findAll = async (req,res) => {
    try{
        const patients = await patientService.findAll();
        if(patients.length == 0){
            res.status(400).send({message:"Nenhum paciente cadastrado!"});
        }else{
            res.status(200).send({
                patients: patients.map(i =>{
                    return {
                    id : i._id,
                    name: i.name,
                    token: i.token,
                    sus:i.sus,
                    birthday: i.birthday,
                    priority: i.priority,
                    status: i.status,
                    clinics: i.clinics.map(clinic => ({
                        id: clinic._id,
                        name: clinic.name,
                        specialty: clinic.specialty
                    }))
                    }
                })
            })
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }

}

const findByToken = async (req,res) => {
    try{
        const patient = req.patient;
        
            res.status(200).send({
                patient: {
                    id : patient._id,
                    id_patient: patient.id_patient,
                    token: patient.token,
                    name: patient.name,
                    cpf: patient.cpf,
                    sus:patient.sus,
                    birthday: patient.birthday,
                    priority: patient.priority,
                    status: patient.status,
                    clinics: patient.clinics.map(clinic => ({
                        id: clinic._id,
                        name: clinic.name,
                        specialty: clinic.specialty
                    }))
                    }
                })
    }catch(err){
        res.status(500).send({message: err.message});
    }

}

const findByCPF = async (req,res) => {
    try{
        const{cpf} = req.params;
        const patient = await patientService.findByCPF(cpf);
        if(!patient){
            res.status(400).send({message:"Nenhum paciente encontrado!"});
        }else{
            res.status(200).send({
                patient: {
                    id : patient._id,
                    name: patient.name,
                    cpf: patient.cpf,
                    token: patient.token,
                    sus:patient.sus,
                    birthday: patient.birthday,
                    priority: patient.priority,
                    status: patient.status,
                    clinics: patient.clinics.map(clinic => ({
                        id: clinic._id,
                        name: clinic.name,
                        specialty: clinic.specialty
                    }))
                    }
                })
            }
    }catch(err){
        res.status(500).send({message: err.message});
    }

}

module.exports = {
    create,
    findAll,
    findByToken,
    findByCPF
}