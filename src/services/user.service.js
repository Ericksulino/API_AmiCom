const User = require("../models/user");

const createService = (body) => User.create(body);

const getByCpf = (cpf) => User.findOne({cpf: cpf});

const getByName = (name) => User.findOne({name: name});

const getById = (id) => User.findById(id);

module.exports = {
    createService,
    getByCpf,
    getByName,
    getById
};
