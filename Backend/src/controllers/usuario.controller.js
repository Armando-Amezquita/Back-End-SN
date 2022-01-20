const mongoose  = require('mongoose');
const usuario =require('../models/usuario.model');


const usersAll = async (req, res, next) =>{
  req.params, req.query, req.boby
  try {
    const total = await usuario.find({})
    res.json(total);
  } catch (error) {
    next(error);
  }
}

const login = async(req,res) => {
  const { password, email } = req.body;
  console.log('password', password)
  console.log('email', email)
  if(!password || !email){
    res.json('Usuario y contraseña requerida');
  }
  else if(password && email){
    const userName = await usuario.find({email}).exec();
    console.log('username', userName)
    console.log('usernamePassword', userName[0].password)
    if(userName[0].password === password){
      res.json('Bienvenido')
    }else{
      console.log(userName[0].password)
      res.json('Contraseña incorrecta')
    }
  }
  // try {
  //   const userName =  await usuario.find({ name: name }).exec();
  //   userName? res.json(userName) : res.json({message: 'No se encontro un usuario con ese nombre', status: 500});
  // } catch (error) {
  //   console.error(error);
  // }  
}

// const userByNameAndById = async(req, res) => {
//   const { id } = req.params;
//   console.log('id', id)
//   // const { name } = req.params
//   // console.log('name',name)
//   try {
//     // if(name){
//     //   const userByName = await usuario.find({name}).exec();
//     //   userByName? res.json(userByName) : res.json({message: 'No se encontro un usuario con ese nombre', status: 500});
//     // }
//       if(id){
//         const userById = await usuario.findById(id).exec();
//         userById? res.json(userById) : res.json({message: 'No se encontro un usuario con ese ID', status: 500});  
        
//     // const total = await usuario.findById(id).exec()
//       }
//   } catch (error) {
//     console.log(error)
//   }
// }


const userByName = async (req, res) => {
  let { name } = req.params;
  console.log('name', name)
  try {
    const userName =  await usuario.find({ name: name }).exec();
    userName? res.json(userName) : res.json({message: 'No se encontro un usuario con ese nombre', status: 500});
  } catch (error) {
    console.error(error);
  }  
};

const userById = async (req, res)=>{
  const { id } = req.params;
  console.log(id)
  try {
    const userId = await usuario.findById(id).exec();
    userId ? res.json(userId) : res.json({message: 'No se encontro un usuario con ese nombre', status: 500});
  } catch (error) {
    console.error(error)
  }
}

const postUser = async (req, res, next) => {
  const { name, LastName, birthday, email, profile, password } = req.body
  try {
    if(!name || !LastName || !email || !password){
      res.json({message: 'Se deben llenar todos los campos requeridos'});
    }else {
      const newUsuario =  await new usuario({ name, LastName, birthday, email, profile, password });
      await newUsuario.save()
      res.json({message:"Se ha registrado satisfactoriamente"});
    }
  } catch (error) {
    console.error(error);
  }
};

// const deleteUser = async (req, res) =>{
//   /* const post = await usuarios.deleteOne(
//         {
//             _id: mongoose.Types.ObjectId("61e8901fbd70a0f87ba750e1")
//         }
//     )
//     console.log(post) */
//     const { id } = req.params;
//     const userId = await usuario.findById(id).exec()
//     if(userId) {
//       usuario.deleteOne(
//         {
//           _id: mongoose.Types.ObjectId(userId)
//         })
//       res.json({ message:"Se ha eliminado exitosamente  el usuario:", userId });
//     }else{
//       res.json({message:"No existe un usuario con dicho ID"});
//     }
// }
/* const post = await usuarios.deleteOne(
      {
          _id: mongoose.Types.ObjectId("61e8901fbd70a0f87ba750e1")
      }
  )
  console.log(post) */
const deleteUser = async (req, res) =>{
    const { id } = req.params;
    const userId = await usuario.findById(id).exec()
    if (userId) {
      await usuario.deleteOne({id: userId}).exec()
      res.json({ message:"Se ha eliminado exitosamente  el usuario:", userId });
    }else{
      res.json({message:"No existe un usuario con dicho ID"});
    }
}
const Updateuser = async (req,res) =>{
  try {
    const { id } = req.params
    const total = await usuario.findById(id).exec()
  if (total) {
    const { name, birthday, email} = req.body
    const Modificado = await usuario.updateOne({
      id: total,
      name:name,
      birthday:birthday,
      email: email
    }).exec()
    const resulFinal = await usuario.findById(id).exec()
  res.status(200).json({message:"se ha modificado exitosamente  el usuario:",resulFinal })
  }else{
    res.status(200).json({message:"no se tiene informacion del usuario"})
  }    
  } catch (error) {
    console.error(error)
  }
}



module.exports = { usersAll, userByName, userById, postUser,deleteUser, Updateuser, login };
