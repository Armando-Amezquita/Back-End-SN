const post =require('../models/post.model');
require("./usuario.controller")
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');

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

const postPublicaciones = async (req, res, next) => {
    const {
        image,
        title,
        category,
        comentarios,
        description,
        options,
        like,
        tags,
      autor} = req.body
    try {
      const newpost =  new post ({
        image:image,
        title:title,
        category:category,
        comentarios:comentarios,
        description:description,
        options:options,
        like:like,
        tags:tags,
        autor:autor
      })
    await newpost.save()
      res.json({message:"hola se ha ingresado nuevo Usuario"});
    } catch (error) {
      console.error(error)
    }
  };
  const UpdatePost = async (req, res)=>{
    post.updateOne({
      id:"61e7b2a1c495bb8d2888b1ef"
    },{
      name:"modifique esta mierda desde aqui"
    }
    )
  }

  const publicacionesXusuario = async (req, res) =>{
    const resultado = await post.aggregate(
    [
      {
        $lookup:
        {
          from: "usuarios",
          localField:"autor",
          foreignField:"_id",
          as:"usuariosAutor"
        }
      },
      { $unwind: "$usuariosAutor"},
      { $match: {usuariosAutor:"61e7cd45a3a6c48bb0fb3ec8"}}
    ])
    res.json(resultado)
  }

  module.exports = { postPublicaciones, UpdatePost, publicacionesXusuario };
