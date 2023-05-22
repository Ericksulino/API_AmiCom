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
            status: {
                type: String,
                default: 'espera'
            }
        }
    ]

})

const Clinic = mongoose.model('Clinic',ClinicSchema);
module.exports = Clinic;
