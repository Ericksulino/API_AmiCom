const mongoose = require('mongoose');

const HistSchema = new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        require: true
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required: true,
    },    
    date:{
        type: Date,
        default: Date.now(),
    },
    operation: {
        type: String,
        required: true,
    },

});

const Hist = mongoose.model("Hist",HistSchema);


module.exports = Hist;
