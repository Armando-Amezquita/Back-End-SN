require('dotenv').config()
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next)=>{
    try {
        const {token} = req.headers;
        if(token){
            const isValid = jwt.verify(token, process.env.SECRET_KEY)
            if(isValid){
                next()
            }else{
                console.log(false)
            }
        }else{
            return res.json({message: "no estas autorizado para acceder a esta informacion", auth:false})
        }
    } catch (error) {
        res.send(error)
        next(error)
    }
}

module.exports = {
    isAuth
}