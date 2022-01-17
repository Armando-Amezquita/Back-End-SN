const { Schema, model } = require('mongoose');

const Usuario = new Schema({
  name:  String,
  LastName: String,
  birthday:   String,
  social_networks: [
            { name: String, 
              link: String 
            }],
  post: { type: Array,
          default: [] 
        },
  follow: { followers:
          {
            type: Array,
            default: []
          } ,
          follows:
          {
            type: Array,
            default: []
          } ,
        },
  
  email:  String,
  profile: {type:String,
            default:'https://cdn1.vectorstock.com/i/thumb-large/05/85/programmer-vector-37610585.jpg'},

  state: {
          type:Boolean,
          default:true
          },

});

module.exports = model('usuario', Usuario)