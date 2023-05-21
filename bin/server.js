const app = require('../src/app');


//Propriedades do servidor
const port = process.env.PORT || 5000;



//pegando o ip
const os = require('os');

const interfaces = os.networkInterfaces();
const addresses = [];
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

// Cria um servidor HTTP e uma escuta de requisições para a porta 8000
app.listen(port,()=>{
    // Imprime no console a URL de acesso ao servidor
    console.log('Servidor executando em: '+addresses+':'+port+'');
});