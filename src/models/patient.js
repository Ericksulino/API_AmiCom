const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        require: true
    },
    token:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
    },
    sus: {
        type: String,
    },
    birthday:{
        type: Date,
    },
    priority: {
        type: Boolean,
        require: true,
    },
    status:{
        type: String,
        default: 'espera'
    },
    clinics: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
            status: {
                type: String,
                default: 'espera'
            }
        }
    ]
});

const Patient = mongoose.model('Patient', PatientSchema);


module.exports = Patient;