const eventService = require("../services/event.sevice");

const create = async (req,res) =>{
    try{
        //console.log(req.body)
        
        const {name, date} = req.body;

        if(!name){
            res.status(400).send({message:"Envie todos os campos para o registro!"});
        } else{
            
            const eventExist = await eventService.findByName(name);
            if(eventExist){
                res.status(400).send({message:"Nome de evento já cadastrado!"});
            }
            else{

                try{
                    const event = await eventService.create(req.body);
                    if(!event){
                        res.status(400).send({message:"Erro ao criar evento!"})
                    }else{
                        res.status(201).send({
                            message: "Evento criado com sucesso!",
                            event: {
                                id: event._id,
                                name,
                                date: event.date
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

const update = async (req,res) =>{
    try{
        //console.log(req.body)
        const {id} = req.params;
        const {name, date} = req.body;

        if(!name && !date){
            res.status(400).send({message:"Envie pelo menos um campo para o update!"});
        } else{
            
            const eventExist = await eventService.findById(id);
            if(!eventExist){
                res.status(400).send({message:"Nome de evento não cadastrado!"});
            }
            else{

                try{
                    const event = await eventService.update(eventExist._id,name,date);
                    if(!event){
                        res.status(400).send({message:"Erro ao atualizar evento!"})
                    }else{
                        res.status(201).send({
                            message: "Evento atualizado com sucesso!",
                            event: {
                                id: event._id,
                                name: event.name,
                                date: event.date
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

const findAll = async (req,res) =>{
    try{
        const events = await eventService.findAll();
        if(events.length == 0){
            res.status(400).send({message: "Não há eventos cadastrados!"});
        }else{
            res.status(200).send({
                events: events.map(i =>{
                    return{
                        id: i._id,
                        name: i.name,
                        date: i.date,
                        clinics: i.clinics.map(clinic =>({
                            id: clinic._id,
                            name : clinic.name,
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

const findByName = async (req,res) =>{
    try{
        const {name} = req.params
        const event = await eventService.findByName(name);
        if(!event){
            res.status(400).send({message: "Não há evento cadastrado com esse nome!"});
        }else{
            res.status(200).send({
                event: {
                        id: event._id,
                        name: event.name,
                        date: event.date,
                        clinics: event.clinics.map(clinic =>({
                            id: clinic._id,
                            name : clinic.name,
                            specialty: clinic.specialty
                        }))
                    }

            })
        }
   }catch(err){
        res.status(500).send({message: err.message});
    }
}

const erase = async (req,res) => {
    try{
        
        const event = req.event;
        const delEvent = await eventService.erase(event._id);
            res.status(200).send({
                message: "Evento deletado com sucesso!",
                event:{
                    id: delEvent._id,
                    name: delEvent.name,
                    date: delEvent.date
                }
            }) 

    }catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    create,
    findAll,
    findByName,
    update,
    erase
}