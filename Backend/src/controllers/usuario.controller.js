const usuario = require('../models/usuario.model');


const usersAll = async (req, res, next) =>{
  try {
    const users = await usuario.find()
    res.json(users);
  } catch (error) {
    next(error);
  }
}


const userByName = async (req, res) => {
	let { name } = req.params;
	try {
		const infoTotal = await usuario.find();
    const result =  infoTotal.filter(e => e.fullname.toLowerCase().includes(name.toLowerCase()))
    result ? res.json(result) : res.json({ message: 'No se encontro un usuario con ese nombre', status: 500 });
	} catch (error) {
		console.error(error);
	}
};

const userById = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const userId = await usuario.findOne({id});
		userId ? res.json(userId) : res.json({ message: 'No se encontro un usuario con ese id', status: 500 });
	} catch (error) {
		console.error(error);
	}
};

const postUser = async (req, res, next) => {
	try {
		const { id, fullname , birthday, email, profile } = req.body;
		const isCreated = await usuario.findOne({ id:id });
		if (!isCreated) {
			if (!id || !fullname || !email) {
				res.json({ message: 'Se deben llenar todos los campos requeridos' });
			} else {
				const newUsuario = await new usuario({ id, fullname, birthday, email: email.toLowerCase(), profile });
				await newUsuario.save();
				res.json({ message: 'Se ha registrado satisfactoriamente' });
			}
		} else {
			return res.json({ message: 'El usuario ya existe' });
		}
	} catch (error) {
		console.error(error);
	}
};


// const postUser = async (req, res) => {
//   const { name, lastName, birthday, email, profile,  } = req.body
//   try {
//     if(!name || !lastName || !email){
//       res.json({message: 'Se deben llenar todos los campos requeridos'});
//     }else {
//       const newUsuario =  await new usuario({ name, lastName, birthday, email, profile,  });
//       await newUsuario.save();
//       res.json({message:"Se ha registrado satisfactoriamente"});
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

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
