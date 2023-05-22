const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    id_patient: {
        type: Number,
        required: true,
        unique: true
    },
    ficha_n: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        unique: true
    },
    cod_sus: {
        type: String,
        unique: true
    },
    birthday:{
        type: Date,
    },
    priority: {
        type: Boolean,
        require: true,
    },
    busy: {
        type: Boolean,
        require: true,
    },
    status:{
        type:String,
        require: true,
    },
    clinics: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
            required: true,
        }
    ]
});

const Patient = mongoose.model('Patient', PatientSchema);


module.exports = Patient;