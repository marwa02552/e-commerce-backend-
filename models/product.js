const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product=new Schema({
     name:{
        type:String
     },
     prix:{
        type:Number
     }, 
     imgs:[{
        type:String
     }],
     color:[{
        type:String
     }],
     size:[{
         sizename:String,
         qnt:Number
     }]
})

module.exports=mongoose.model('Product',product)