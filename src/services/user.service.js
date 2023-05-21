const User = require("../models/user");

const createService = (body) => User.create(body);

const getByCpf = (cpf) => User.findOne({cpf: cpf});

const getByName = (name) => User.findOne({name: name})

module.exports = {
    createService,
    getByCpf,
    getByName
};
