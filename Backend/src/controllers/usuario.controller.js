const usuario =require('../models/usuario.model')

const usersAll = async (req, res, next) =>{
  try {
    const total = await usuario.find({})
    res.status(200).json(total)
  } catch (error) {
    
  }
}

const userByName = async (req, res, next) => {
try {
  const { name } = req.params
  const resulta =  await usuario.find({ name: name} ).exec();
  resulta.length?
  res.json(resulta):
  res.json({message:'no se encontro el usuario'})
} catch (error) {
  console.error(error)
}  
};

const userById = async (req, res, next)=>{
  try {
    const { id } = req.params
    const total = await usuario.findById(id).exec()
    res.status(200).json(total)
  } catch (error) {
    console.error(error)
  }
}
const postUser = async (req, res, next) => {
  const {name, LastName, birthday, email, profile} = req.body
  try {
    const newUsuario =  new usuario ({
      name:name,
      LastName:LastName,
      birthday:birthday,
      email:email,
      profile:profile
    })
  await newUsuario.save()
    res.json({message:"hola se ha ingresado nuevo Usuario"});
  } catch (error) {
    console.error(error)
  }
};
const deleteUser = async (req, res, next) =>{
const { id } = req.params;
const total = await usuario.findById(id).exec()
if (total) {
  await usuario.deleteOne({id: total}).exec()
res.status(200).json({message:"se ha elimnado exitosamente  el usuario:",total })
}else{
  res.status(200).json({message:"no se tiene informacion del usuario"})
}
}
const Updateuser = async (req,res, next) =>{
  try {
    const { id } = req.params
    const total = await usuario.findById(id).exec()
if (total) {
  const { name, birthday, email} = req.body
  const Modificado= await usuario.updateOne({
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
module.exports = { usersAll, userByName, userById, postUser,deleteUser, Updateuser };
