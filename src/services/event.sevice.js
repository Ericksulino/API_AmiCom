const Event = require("../models/event");

const create = (body) => Event.create(body);

const findAll = (body) => Event.find().populate("clinics","patients");

const findById = (_id) => Event.findById({_id}).populate("clinics","patients");

const findByName = (name) => Event.findOne({name}).populate("clinics","patients");

const update = (_id,name,date) => Event.findOneAndUpdate({_id},{name,date},{new:true});

const erase = (_id) => Event.findByIdAndRemove(_id);

module.exports ={
    create,
    findAll,
    findById,
    findById,
    findByName,
    update,
    erase
}
