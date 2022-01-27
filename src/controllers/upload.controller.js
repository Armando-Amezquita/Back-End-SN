const multer = require('multer')
require('dotenv').config()
const jwt = require("jsonwebtoken");

// const { token } = require('morgan');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        console.log(req.headers.token)
        const { id } = jwt.verify(req.headers.token, process.env.SECRET_KEY)
        cb(null, `${id}_profile.jpg`)
        
        
        // console.log("----->",toto)
        // cb(null,`${id_prof}-${file.originalname}`)
    }
})
const uploadF = multer({storage:storage})
const uploadI = uploadF.single('archive')
const uploadM = uploadF.array('archive')

const uploadFile =(req, res)=>{ 

    res.json({message:"se ha subido el archivo"})
    }

const multiple =(req, res)=>{
    res.json({message:"se ha subido varios archivos"})
    }

module.exports ={ uploadI,
    uploadM,  uploadFile, multiple}
