const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    clinic:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true,
    },
    patients : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ]
    
});

const List = mongoose.model('List', ListSchema);


module.exports = List;