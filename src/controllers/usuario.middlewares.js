const isAuth = (req, res, next)=>{
    try {
        const {token} = req.headers;
        if(token){
            next()
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