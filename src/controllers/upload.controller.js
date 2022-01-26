const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null,`${Date.now()}-${file.originalname}`)
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
