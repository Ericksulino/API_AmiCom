const histService = require("../services/hist.service");

const findAll = async (req,res) =>{
    try{
        const hists = histService.findAll();
        if(hists.length == 0){
            res.status(400).send({message:"Nenhum histórico cadastrado!"});
        }else{
            res.status(200).send({
                message: "Todos os históricos:",
                hists: hists.map(hist =>{
                    return{
                        id : hist._id,
                        event:{
                            id: hist.event._id,
                            name: hist.event.name,
                            date: hist.event.date
                        },
                        clinic: {
                            id: hist.clinic._id,
                            name: hist.clinic.name,
                            specialty: hist.clinic.specialty
                        },
                        patient:{
                            id: hist.patient._id,
                            token: hist.patient.token,
                            name: hist.patient.name
                        },
                        operation: hist.operation,
                        date: hist.date
                    }
                })
            })
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    findAll
}