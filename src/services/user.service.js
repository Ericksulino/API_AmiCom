const User = require("../models/user");

const createService = (body) => User.create(body);

const getByCpf = (cpf) => User.findOne({cpf: cpf});

const getByName = (name) => User.findOne({name: name});

const getById = (id) => User.findById(id);

const updateService = (id,name,cpf,birthday,password,) => 
User.findOneAndUpdate({_id: id},{
    name,
    cpf,
    birthday,
    password, 
},{ new: true });

const erase = (_id) => User.findByIdAndRemove({_id},{ new: true });

module.exports = {
    createService,
    getByCpf,
    getByName,
    getById,
    updateService,
    erase
};
