const post =require('../models/post.model');
const jwt = require('jsonwebtoken');

const postAdd = async (req, res, next) =>{
    const {token, image, title, category, comentarios, description, options, fecha_creacion, fecha_modificacion, like,tags} = req.body
    // const dataPost = req.body;
    try {
        if(!image && title && category && comentarios && description && options && fecha_creacion && fecha_modificacion && like && tags){
            return res.json({message: 'Se requiere llenar todos los campor', error: error})
        }
        const user = jwt.verify(token);
        user.post
    } catch (error) {
        
    }
    
}
