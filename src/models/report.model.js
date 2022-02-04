const { Schema, model } = require('mongoose');

const Report= new Schema({
    idUser: String,
    idUserReport: String,
    message: String,
    state: {
        type:Boolean,
        default: false
    }

});

module.exports = model('report', Report);