const mongoose = require('mongoose');

const HistSchema = new mongoose.Schema({
    operation_name: {
        type: String,
        required: true,
    },
    specialty_clinc: {
        type: String,
        required: true,
    },
    clinc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required: true,
    },    
    data_and_houer:{
        type: Date,
        default: Date.now(),
    }


});

const Hist = mongoose.model("Hist",HistSchema);


module.exports = Hist;
