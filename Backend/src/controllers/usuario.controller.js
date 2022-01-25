const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario.model');

const usersAll = async (req, res, next) => {
	try {
		const users = await usuario.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
};

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


const userByName = async (req, res) => {
	let { name } = req.params;
	try {
		const infoTotal = await usuario.find({})
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

const deleteUser = async (req, res) => {
	const { id } = req.params;
	const userId = await usuario.findById(id);
	if (userId) {
		await usuario.deleteOne({ id: userId });
		res.json({ message: 'Se ha eliminado exitosamente  el usuario:', userId });
	} else {
		res.json({ message: 'No existe un usuario con dicho ID' });
	}
};
const Updateuser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await usuario.findById(id);
		if (user) {
			const { name, birthday, email, lastname, profile } = req.body;
			user.name = name;
			user.lastname = lastname;
			user.birthday = birthday;
			user.email = email;
			user.profile = profile;
			await user.save();
			res.status(200).json({ message: 'se ha modificado exitosamente  el usuario:', data: user });
		} else {
			res.status(200).json({ message: 'no se tiene informacion del usuario' });
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const authorization = async (req, res, next) => {
	try {
		const { id } = req.body;
		const user = await usuario.findById(id);
		if (req.query.token) {
			try {
				const verficacion = jwt.verify(req.query.token, process.env.SECRET_KEY);
				return res.json({ ...verficacion, data: true });
			} catch (error) {
				console.log(error);
				return res.json({ ...error, data: false });
			}
		}
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
			return res.json({ message: `Se ha generado el token para ${user.name}`, data: token });
		}
		res.json({ message: 'El usuario no existe' });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

module.exports = { usersAll, userByName, userById, postUser, deleteUser, Updateuser, authorization };
