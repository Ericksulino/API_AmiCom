const Hist = require("../models/historic");

const create = (body) => Hist.create(body);

const findAll = () => Hist.find().sort({_id:-1}).populate("patient").populate("event").populate("clinic");

const findPatient = (patient) => Hist.find({patient}).sort({_id:-1}).populate("patient").populate("event").populate("clinic");

const findClinic = (clinic) => Hist.find({clinic}).sort({_id:-1}).populate("patient").populate("event").populate("clinic");

const findEvent = (event) => Hist.find({event}).sort({_id:-1}).populate("patient").populate("event").populate("clinic");

module.exports = {
    create,
    findAll,
    findEvent,
    findPatient,
    findClinic
}