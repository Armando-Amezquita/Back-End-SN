require('dotenv').config()
const post =require('../models/post.model');
require("./usuario.controller")
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');
const usuarioModel = require('../models/usuario.model');

const getPosts = async(req, res, next)=>{
  try {
    let allPost = await post.find()
    for(post of allPost){
      const user = await usuarioModel.findOne({id: post.autor});
      post.autor = {
        id: user.id,
        profile: user.profile,
        fullname: user.fullname
      }
    }
    res.send({message: 'Estos son todos los posts', data: allPost})
  } catch (error) {
    res.send(error)
  }
}



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
        description,
        tags,} = req.body
      const {token} = req.headers
    try {
      const {id} = jwt.verify(token, process.env.SECRET_KEY)
      const newpost =  new post ({
        image,
        title,
        category,
        description,
        tags:tags,
        autor:id
      })
    await newpost.save()
      res.json({message:"Se ha publicado correctamente"});
    } catch (error) {
      res.send(error)
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

  module.exports = { postPublicaciones, UpdatePost, publicacionesXusuario, getPosts };
