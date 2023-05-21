const mongoose = require("mongoose")

const ClinicSchema = new mongoose.Schema({
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
        require: true,
    },
    open: {
        type: Boolean,
        require: true,
    },
    patients : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ]

})

const Clinic = mongoose.model('Clinic',ClinicSchema);
module.exports = Clinic;
