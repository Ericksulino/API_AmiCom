const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const login = async (req,res) => {
    try{
        const {name,password} = req.body;

        const user = await authService.login(name);

        if(!user){
            res.status(404).send({message:"Usuário ou senha incorretos!"});
        }else{
            const passwordIsValid = await bcrypt.compareSync(password,user.password);

            if(!passwordIsValid){
                res.status(404).send({message:"Usuário ou senha incorretos!"});
            }else{
                const token = await authService.generateToken(user.id);
                res.status(200).send({token});
            }
        }

    }catch(err){
        res.status(500).send(err.message);
    }
}

const valid = async (req,res) =>{
    try{
        const user = await userService.getById(req.id);
        if(!user){
            res.status(404).send({message:"Token inválido!"});
        }else{
            res.status(201).send({message:"token válido", user: user.name});
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {
    login,
    valid
}