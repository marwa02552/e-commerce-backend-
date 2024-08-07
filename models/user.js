const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user= new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    userType:{
        type:String,
        enum: ['user', 'admin'],
        default:'user'

    },
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    card:[
        {
            id: {
                type: Schema.Types.ObjectId, 
                ref: 'Product',
              },
          
            size:String,
            color:String,
            qnt:Number,
            
        }
    ]
})
module.exports=mongoose.model('User',user)