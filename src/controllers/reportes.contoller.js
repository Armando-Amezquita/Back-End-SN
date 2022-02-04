require('dotenv').config();
const usuario = require('../models/usuario.model');
const post = require('../models/post.model');
const jwt = require('jsonwebtoken');
const report = require('../models/report.model');


const notificacionAdmin = async(req,res) => {
    try {
	const { userID, message } = req.body; //persona que reportaron
	const { token } = req.headers;
        const { id } = jwt.verify(token,process.env.SECRET_KEY); // persona que hizo el reporte 
        const newreport = new report({
            idUser: userID,
            idUserReport: id,
            message,
        });
        await newreport.save();
        const userAdmins = await usuario.findOne({ id : "FXpKkFgG0JUky8y5O8lNu5Qw73U2"});
        userAdmins.report.push(newreport);
        userAdmins.save();
        res.json(newreport);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { 
    notificacionAdmin
};