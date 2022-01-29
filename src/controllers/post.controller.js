require('dotenv').config()
const post =require('../models/post.model');
require("./usuario.controller")
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const   getPosts = async(req, res, next)=>{
  try {
    const {id} = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    let allPost = await post.aggregate([
      {
        $lookup:{
          from: "usuarios",
          let: {id_usuario: "$autor"},
          pipeline: [
            {
              $unwind: "$id"
            },
            {
              $match: {
                $expr: {
                  $eq: ["$id", "$$id_usuario"]
                }
              }
            }
          ],
          as: "autorData"
        }
      }
    ]).sort({createdAt:-1})

    let newAuthor = {}
    allPost=allPost.map(e=>{
      if(e.autorData[0])
      {newAuthor = {
        fullname:e.autorData[0].fullname,
        id:e.autorData[0].id,
        cohorte:e.autorData[0].cohorte[0],
        profile:e.autorData[0].profile,
        email:e.autorData[0].email,
      }
      console.log(newAuthor, e.autorData[0].fullname)
      e.autorData[0]={...newAuthor}}
      return e
    })
    // for(let post of allPost){
      //   const user = await usuarioModel.findOne({id: post.autor});
    //   newAuthor = {
      //     id: user.id,
      //     profile: user.profile,
      //     fullname: user.fullname
      //   }
      //   post.autor = JSON.stringify(newAuthor)
      // }
      // console.log(allPost, 'all')
      if(req.query.myself==='false'){
        allPost = allPost.filter(e=>e.author!==id)
      }
      if(req.query.myself==='true'){
        allPost = allPost.filter(e=>e.author===id)
      }
      if(req.query.userid!==undefined){
        allPost = allPost.filter(e=>e.author===req.query.userid)
      }
      if(req.query.follows==='true'){
        const {follow:{follows}} = await usuarioModel.findOne({id}, {"follow.follows":1})
        allPost = allPost.filter((e)=>follows.includes(e.autor))
      }
      res.json({message: 'Estos son todos los posts', data: allPost})
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
