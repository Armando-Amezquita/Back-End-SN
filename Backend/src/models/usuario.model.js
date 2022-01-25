const { Schema, model } = require('mongoose');

const usuarios= new Schema({
  id: String,
  fullname: String,
  birthday: String,
  nacionalidad: {String, default:[]},
  cohorte: {String ,default:[]},
  rol: String,
  description: String,
  background_picture: String,
  cualquiera: String,
  // hola
  social_networks: [
    { name: String, 
      link: String 
    }],
    post: 
      { type: Array,
        default: [] 
      },
    follow: 
      { followers:
        {
          type: Array,
          default: []
        },
        follows:
          {
            type: Array,
            default: []
          },
        },
  email:  String,
  profile: {
    type:String,
    default:'https://cdn1.vectorstock.com/i/thumb-large/05/85/programmer-vector-37610585.jpg'
  },
  state: {
    type:Boolean,
    default:true
    },
});

module.exports = model('usuarios', usuarios)