require('dotenv').config();
const usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const {checkList} = require('../fake-data/fakelist')

const usersAll = async (req, res, next) => {
	let message=""
	try {
		const { id } = jwt.verify(req.headers.token, process.env.SECRET_KEY);
		let users = await usuario.find();
		if(req.query.myself==='true'){
			users = users.filter((e) => e.id === id);
		}
		if (req.query.myself === 'false') {
			users = users.filter((e) => e.id !== id);
		}
		if(req.query.follows==='false'){
			const myself = await usuario.findOne({id: id})
			users = users.filter((e) => !myself.follow.follows.includes(e.id));
			message += users.length?"Estas son las personas no sigues":"Sigues a todos"
		}
		if(req.query.follows==='true'){
			const myself = await usuario.findOne({id: id})
			users = users.filter((e) => myself.follow.follows.includes(e.id));
			message += users.length?"Estas son las personas que sigues":"Aun no sigues a nadie"
		}
		if(req.query.followers==='true'){
			const myself = await usuario.findOne({id: id})
			users = users.filter((e) => myself.follow.followers.includes(e.id));
			message += users.length?"Estas son las personas que te siguen":"Aun no tienes seguidores"
		}
		if(req.query.followers==='false'){
			const myself = await usuario.findOne({id: id})
			users = users.filter((e) => !myself.follow.followers.includes(e.id));
			message += users.length?"Estas son las personas que aun no te siguen":"Eres muy popular"
		}
		res.json({message, data:users});
	} catch (error) {
		res.send(error)
		next(error);
	}
};

const userByName = async (req, res) => {
	let { name } = req.params;
	let expresion = null;
	if (name.includes(' ')) {
		const result = name.split(' ');
		expresion = new RegExp();
	} else {
		expresion = new RegExp('^[' + name + '+]', 'i');
		// expresion = new RegExp("^["+ name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()+"|"+name+"+]")
	}
	try {
		const toto = await usuario.find({ fullname: { $regex: expresion } });
		// const toto = await usuario.aggregate([{$match:{fullname : name}}])
		// const result =  infoTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
		toto ? res.json(toto) : res.json({ message: 'No se encontro un usuario con ese nombre', status: 500 });
	} catch (error) {
		console.error(error);
	}
};

// const userByName = async (req, res) => {
// 	let { name } = req.params;
// 	try {
// 		const infoTotal = await usuario.find();
//     const result =  infoTotal.filter(e => e.fullname.toLowerCase().includes(name.toLowerCase()))
//     result ? res.json(result) : res.json({ message: 'No se encontro un usuario con ese nombre', status: 500 });
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

const userById = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const userId = await usuario.findOne({ id });
		userId ? res.json(userId) : res.json({ message: 'No se encontro un usuario con ese id', status: 500 });
	} catch (error) {
		console.error(error);
	}
};

const postUser = async (req, res, next) => {
	try {
		const {
			id,
			fullname,
			birthday,
			email,
			profile,
			nacionalidad,
			rol,
			description,
			background_picture
		} = req.body;
		const isCreated = await usuario.findOne({ id: id });
		if (!isCreated) {
			if (!id || !fullname || !email) {
				return res.json({ message: 'Se deben llenar todos los campos requeridos' });
			} else {
				const newUsuario = await new usuario({
					id,
					fullname,
					birthday,
					email: email.toLowerCase(),
					profile,
					nacionalidad,
					cohorte:checkList(email)?checkList(email):"",
					rol,
					description,
					background_picture,
					state: checkList(email)?true:false
				});
				await newUsuario.save();
				if(checkList(email)){
					const token = jwt.sign({ id: newUsuario.id }, process.env.SECRET_KEY, { expiresIn: '1d' });
					return res.json({ message: 'Se ha registrado satisfactoriamente', data: token });
				}
				return res.json({message: "usted no pertence a HENRY", data: false})
			}
		} else {
			if(checkList(email)){
				const token = jwt.sign({ id: isCreated.id }, process.env.SECRET_KEY, { expiresIn: '1d' });
				return res.json({ message: 'El usuario ya existe', data: token });
			}
			return res.json({message: "usted no pertence a HENRY", data: false})
		}
	} catch (error) {
		res.send(error);
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

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = await usuario.findOne({ id: id });
		if (userId) {
			await usuario.deleteOne({ id });
			res.json({ message: 'Se ha eliminado exitosamente  el usuario:', userId });
		} else {
			res.json({ message: 'No existe un usuario con dicho ID' });
		}
	} catch (error) {
		res.send(error);
	}
};

const Updateuser = async (req, res) => {
	try {
		const { id } = jwt.verify(req.headers.token, process.env.SECRET_KEY);
		const user = await usuario.findOne({id});
		if (user) {
			const { background_picture, profile, fullname, birthday, description, nacionalidad } = req.body;
			await usuario.updateOne({id},{ background_picture, profile, fullname, birthday, description, nacionalidad });
			const resulFinal = await usuario.findOne({id});
			res.status(200).json({ message: 'se ha modificado exitosamente  el usuario:', data:resulFinal });
		} else {
			res.status(200).json({ message: 'no se tiene informacion del usuario' });
		}
	} catch (error) {
		res.send(error);
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

const FollowMe = async (req, res, next) => {
	const { followMe } = req.body;
	const {token} = req.headers;
	try {
		let message = '';
		const { id } = jwt.verify(token,process.env.SECRET_KEY)
		const myself = await usuario.findOne({ id });
		const user = await usuario.findOne({ id: followMe });
		if (user) {
			if (user.follow.followers.includes(id)) {
				message = `dejaste de seguir a ${user.fullname}`;
				user.follow.followers.splice(user.follow.followers.indexOf(id), 1);
				myself.follow.follows.splice(user.follow.followers.indexOf(followMe), 1);
			} else {
				message = `seguiste a ${user.fullname}`;
				user.follow.followers.push(id);
				myself.follow.follows.push(followMe);
			}
			await user.save();
			await myself.save();
			res.json({ message });
		} else {
			res.json({ message: 'No existe el usuario' });
		}

		// await usuario.updateOne({_id:id},
		// 	{
		// 		$push:{
		// 			"follow.followers":  flows
		// 		}
		// 	})
	} catch (error) {
		console.log(error);
	}
};
module.exports = { usersAll, userByName, userById, postUser, deleteUser, Updateuser, authorization, FollowMe };
