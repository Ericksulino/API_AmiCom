const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    birthday:{
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User', UserSchema);


module.exports = User;