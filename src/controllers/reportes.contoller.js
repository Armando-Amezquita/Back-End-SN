require('dotenv').config();
const usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const report = require('../models/report.model');
const autorization = require('../models/autorization.model');
const res = require('express/lib/response');

const newReport = async(req,res) => {
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
        res.json('Se creó el reporte');
    } catch (error) {
        console.log(error);
    }
}

const reports = async(req, res) => {
    const { idreported, type } = req.body;
	const {token} = req.headers;
	const { id } = jwt.verify(token,process.env.SECRET_KEY)
	const reported = await usuario.findOne({ id: idreported });
    const reporter = await usuario.findOne({ id });
    if(reported){
        notification(reported, reporter, type);
    }
}

const getReports = async(req, res) => {
    try { 
        const reports = await report.find();
        if(reports){
            res.json(reports)
        }
        else{
            res.json('No hay reportes');
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const notification = async(idreported, idreporter, type) => {
    try {
        const admins = await usuario.find({ rol: 'ADMIN'});
        switch (type) {
            case 'comment':
                const messageCommentData = {
                    idreported,
                    idreporter,
					message: `Se reporto por un comentario`,
					icon: 'uploads/Icons/reports.svg',
				}
                 admins.map(ele => ele.notifications.push(messageCommentData));
            break;
            case 'person':
                const messagePersonData = {
                    idreported,
                    idreporter,
                    message: `Se reporto por una persona`,
					icon: 'uploads/Icons/reports.svg',
                }
                 admins.map(ele => ele.notifications.push(messagePersonData));
            default:
                break;
        }
        await admins.save()
    } catch (error) {
        console.log(error);
    }
}

const cleanReports = async(req, res, next)=>{
    const {iduser} = req.params;
    try {
        const user = await usuario.findOne({id:iduser})
        user.report = [];
        await user.save()
        res.json({message: "se limpiarion sus reportes"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const newAutorization = async (req, res, next)=>{
    const {email, cohorte} = req.body
    try {
        const isCreated = await autorization.findOne({email})
        if(!isCreated){
            const auth = new autorization({
             email,
             cohorte   
            })
            await auth.save()
            return res.json({message: `${email} autorizado`})
        }
        res.json({message: `${email} ya está autorizado`})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const getAutorization = async (req, res, next)=>{
    try {
        const auth = await autorization.find()
        res.json(auth)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
module.exports = { 
    newReport, getReports, reports, cleanReports, newAutorization, getAutorization
};