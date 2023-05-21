const patientService = require("../services/patient.service");

const create = async (req, res) =>{
    try{
        const {id_patient,fixa_n,name,cpf,cod_sus,birthday,priority,busy,status} = req.body;
        if(!id_patient || !fixa_n || !name || priority == undefined || busy == undefined || !status){
            res.status(400).send({message:"Envie todos os campos obrigatórios para o registro!"});
        }else{
            const patientExist = await patientService.findByIdPati(id_patient);
            if(patientExist){
                res.status(400).send({message:"Id paciente já cadastrado!"});
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
                                id_patient,
                                fixa_n,
                                name,
                                priority,
                                busy,
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
                    id_patient: i.id_patient,
                    fixa_n: i.fixa_n,
                    name: i.name,
                    priority: i.priority,
                    busy: i.busy,
                    status: i.status,
                    clinics: i.clinics.map(clinic => ({
                        id: clinic._id,
                        name: clinic.name,
                    }))
                    }
                })
            })
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }

}

const findByIdPati = async (req,res) => {
    try{
        const{id_patient} = req.params;
        const patient = await patientService.findByIdPati(id_patient);
        if(!patient){
            res.status(400).send({message:"Nenhum paciente cadastrado!"});
        }else{
            res.status(200).send({
                patient: {
                    id : patient._id,
                    id_patient: patient.id_patient,
                    fixa_n: patient.fixa_n,
                    name: patient.name,
                    priority: patient.priority,
                    busy: patient.busy,
                    status: patient.status,
                    clinics :
                    [
                        {
                            id : patient.clinic._id,
                            name : patient.clinic.name,
                        }
                        
                    ]
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
    findByIdPati
}