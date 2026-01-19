const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name :{
        type: String,
        required: [ true, 'product name required'],
        trim: true,
    },
    price:{
        type:Number,
        required: [true, 'price is required'],
        min:0,
    },
    stock:{
        type: Number,
        required: true,
        min:0,
        default:0,

    },
    category:{
        type:String,
        trim:true,

    },
    imageUrl:{
        type:String,
        trim:true,

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})

module.exports = mongoose.model('product', productschema);