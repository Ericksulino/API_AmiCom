const mongoose = require("mongoose")

const ClinicSchema = new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        require: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    vacancies: {
        type: Number,
        require: true,
    },
    specialty: {
        type: String,
        require: true,
    },
    appointment_max: {
        type: Number,
        require: true,
    },
    appointment_count: {
        type: Number,
        default: 0
    },
    open: {
        type: Boolean,
        require: true,
    },
    patients : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        }
    ]

})

const Clinic = mongoose.model('Clinic',ClinicSchema);
module.exports = Clinic;
