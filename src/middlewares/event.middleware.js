const eventService = require("../services/event.sevice");


const validEvent = async (req,res,next) =>{
    try{
        const {id} = req.params;
        const event = await eventService.findById(id);
        if(!event){
            return res.status(400).send({message:"Evento inexistente!"});
        }
        req.id = id;
        req.event = event;
        next();
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

const validEventByName = async (req,res,next) =>{
    try{
        const {event} = req.body || req.params;
        const validevent = await eventService.findByName(event);
        if(!validevent){
            return res.status(400).send({message:"Evento inexistente!"});
        }
        req.body.event = validevent;
        next();
    } catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    validEvent,
    validEventByName
}
