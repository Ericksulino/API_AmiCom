const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

const app = express();

//config do dotenv -variaveis de ambiente
dotenv.config();

// Importando rotas


//Banco de dados
const connectDatabase = require("./database/db")

//User
const userRoute = require("./routes/user.route");

//Clinic
const clinicRoute = require("./routes/clinic.route");

//Patient
const patientRoute = require("./routes/patient.route");

//Auth
const authRoute = require("./routes/auth.route");

//Event
const eventRoute = require("./routes/event.route");

// Usando rotas

//Conexão com o Banco de dados
connectDatabase();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rota user
app.use("/user",userRoute);

//rota clinic
app.use("/clinic",clinicRoute);

//rota patiente
app.use("/patient",patientRoute);

//rota auth
app.use("/auth",authRoute);

//rota event
app.use("/event",eventRoute);

module.exports = app;