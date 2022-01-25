const { Schema, model, Mongoose } = require('mongoose');

const Post = new Schema(
    {
    image:{ type:String},
    title: {type:String},
    category: {type:String},
    comentarios: {type:String},
    description: {type: String},
    options: {type:String},
    like: {type:String},
    tags: { type: Array,
            default: [] 
        },
    autor:{type: Schema.ObjectId}
},
{
    timestamps: true
});

module.exports = model('post', Post)

// ['codigo Js', 'Codigo' ]
// jadasafsd