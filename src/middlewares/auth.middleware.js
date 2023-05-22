const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

module.exports = authMiddleware = (req,res,next) =>{
    try{
        const {authorization} = req.headers;
        if(!authorization){
            res.status(401);
        }else{
            const partes = authorization.split(" ");
            if(partes.length !== 2){
                return res.status(401);
            }
            const [schema,token] = partes
            if(schema !== 'Bearer'){
                return res.status(401);
            }
            jwt.verify(token,process.env.SECRET_JWT, async(error, decode) =>{
                if (error) {
                    return res.status(401).send({ message: "Token inválido" });
                  }
                console.log(decode);
                const user = await userService.getById(decode.id);
                req.id = user.id;
                return next();
            })
        }
    }catch (error){
        res.status(500).send(error.message);
    }
}