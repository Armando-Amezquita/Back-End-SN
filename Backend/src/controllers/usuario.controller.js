const mongoose  = require('mongoose');
const usuario =require('../models/usuario.model');


const usersAll = async (req, res, next) =>{
  try {
    const users = await usuario.find()
    res.json(users);
  } catch (error) {
    next(error);
  }
}

// const login = async(req,res) => {
//   const { password, email } = req.body;
//   if(!password || !email){
//     res.json('Usuario y contraseña requerida');
//   }
//   else if(password && email){
//     const userName = await usuario.find({email});
//     console.log('username', userName)
//     console.log('usernamePassword', userName[0].password)
//     if(userName[0].password === password){
//       res.json('Bienvenido')
//     }else{
//       console.log(userName[0].password)
//       res.json('Contraseña incorrecta')
//     }
//   }

// }

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
        
//     // const users = await usuario.findById(id).exec()
//       }
//   } catch (error) {
//     console.log(error)
//   }
// }


const userByName = async (req, res) => {
  let { name } = req.params;
  try {
    const userName =  await usuario.find({ name });
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

const postUser = async (req, res) => {
  const { name, LastName, birthday, email, profile,  } = req.body
  try {
    if(!name || !LastName || !email){
      res.json({message: 'Se deben llenar todos los campos requeridos'});
    }else {
      const newUsuario =  await new usuario({ name, LastName, birthday, email, profile,  });
      await newUsuario.save();
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
    const userId = await usuario.findById(id)
    if (userId) {
      await usuario.deleteOne({id: userId})
      res.json({ message:"Se ha eliminado exitosamente  el usuario:", userId });
    }else{
      res.json({message:"No existe un usuario con dicho ID"});
    }
}
const Updateuser = async (req,res) =>{
  try {
    const { id } = req.params
    const user = await usuario.findById(id)
  if (user) {
    const { name, birthday, email, lastName} = req.body
    await usuario.updateOne({ id, name, birthday, email, lastName })
    const resulFinal = await usuario.findById(id)
  res.status(200).json({message:"se ha modificado exitosamente  el usuario:",resulFinal })
  }else{
    res.status(200).json({message:"no se tiene informacion del usuario"})
  }    
  } catch (error) {
    console.error(error)
  }
}



module.exports = { usersAll, userByName, userById, postUser,deleteUser, Updateuser };
