const post =require('../models/post.model');
const usuario =require('../models/usuario.model')
require("./usuario.controller")
const jwt = require('jsonwebtoken');
const { mongoose } = require('mongoose');
const res = require('express/lib/response');

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
      res.json({message:"Se creó la publicacion"});
    } catch (error) {
      console.error(error)
      next(error)
    }
  };
  const UpdatePost = async (req, res)=>{
    const {id} = req.body
    await post.updateOne({
      id
    },{
      ...req.body.data
    }
    )
    return res.json({message:"Se actualizó el post"})
  }

  const publicacionesXusuario = async (req, res) =>{
    const { idS } = req.params
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
      { $match: {usuariosAutor:idS}}
    ])
    
    res.json(resultado) 
  }
  const listaPelis = async (req, res) =>{
    const resultado = await usuario.aggregate(
      [
        {
          $lookup:
          {
            from: "post",
            let:{
              aliasNombreCategoria: "$title"
            }, 
            pipeline:[
              {
                $match:{
                  $expr:{
                    $in:["$$aliasNombreCategoria", "$autor"]
                  }
                }
              }
            ], 
            as:"listas"
          }
        }
      ]
    )
    res.json(resultado)
  }

  module.exports = { postPublicaciones, UpdatePost, publicacionesXusuario, listaPelis };
