const clinicService = require("../services/clinic.service");

const validClinic = async (req,res,next) =>{
    const {id} = req.params;
    try{
        const clinic = await clinicService.findById(id);
        if(!clinic){
            return res.status(400).send({message:"Consultório inexistente!"});
        }
        req.clinic = clinic;
        next();
    }catch(err){
        res.status(500).send({message: err.message});
    }
   
}

const validClinicByName = async (req,res,next)=>{
    const {name} = req.params;
    try{
        const clinic = await clinicService.findByName(name);
        if(!clinic){
            return res.status(400).send({message:"Consultório inexistente!"});
        }
        req.clinic = clinic;
        next();
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    validClinic,
    validClinicByName
}