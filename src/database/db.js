const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path:'../../.env'});

const connectDatabase = () =>{
    console.log("Tentando conectar ao Banco");

    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb://127.0.0.1:27017/AmiComDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1',{useNewUrlParser:true,useUnifiedTopology: true}
    ).then(() => console.log("MongoDB Atlas Conectado!")).catch((error) => console.log(error));
}; 

module.exports = connectDatabase;