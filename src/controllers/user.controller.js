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


const update = async (req, res) =>{
    try {
        //console.log(req.body)
        const {name, cpf , birthday, password} = req.body;

        if(!name && !cpf &&  !birthday &&  !password) {
            res.status(400).send({message:"Envie pelo menos um campo para registro!"});
        }
            else{
                try{
                    const user = await userService.updateService(req.id,name,cpf,birthday);

                    //console.log(user);

                    if(!user){
                        res.status(400).send({message:"Erro ao editar usuário!"});
                    }

                    res.status(201).send({
                        message: "Usuário editado com Sucesso!",
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

    }catch(err){
        res.status(500).send({message: err.message});
    }
};

const erase = async (req,res) =>{
    try{
        const delUser = await userService.erase(req.id);
        if(!delUser){
            res.status(400).send({message:"Erro ao deletar usuário!"});
        }else{
            res.status(200).send({
                message: "Usuário removido com sucesso!",
                user: {
                    id :delUser._id,
                    name: delUser.name,
                    cpf: delUser.cpf,
                    birthday: delUser.birthday
                }
            })
        }
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    create,
    update,
    erase
};