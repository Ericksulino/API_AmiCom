const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    clinics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clinic',
        }
    ], 
    date:{
        type: Date,
        default: Date.now(),
    }


});

const Event = mongoose.model("Event",EventSchema);


module.exports = Event;
