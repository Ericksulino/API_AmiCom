const userService = require("../services/user.service");

const create = async (req, res) =>{
    try {
        //console.log(req.body)
        const {name, cpf , birthday, password} = req.body;

        if(!name || !cpf || !birthday || !password) {
            res.status(400).send({message:"Envie todos os campos para registro!"});
        }
        else{
            const userExist = await userService.getByCpf(cpf);

            if(userExist){
                res.status(400).send({message:"CPF já cadastrado!"});
            }
            else{
                try{
                    const user = await userService.createService(req.body);

                    //console.log(user);

                    if(!user){
                        res.status(400).send({message:"Erro ao criar usuário!"});
                    }

                    res.status(201).send({
                        message: "Usuário criado com Sucesso!",
                        user: {
                            id :user._id,
                            name,
                            cpf,
                            birthday
                        }
                    })

                } catch(err){
                    res.status(500).send({message: err.message});
                }
            }
        }

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

module.exports = {create};