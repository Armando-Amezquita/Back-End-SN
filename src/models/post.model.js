const { Schema, model } = require('mongoose');

const Post = new Schema(
    {
    image:{ type:String},
    title: {type:String},
    category: {type:String},
    comentarios: {type:String},
    description: {type: String},
    options: {type:String},
    like: {type:Array},
    tags: { type: Array,
            default: [] 
        },
    autor:{type: String}
},
{
    timestamps: true
});

module.exports = model('post', Post)

// ['codigo Js', 'Codigo' ]
// jadasafsd