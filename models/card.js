/**
 * the credit card sechme :
 * number
 * totale
 * username
 * 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bankcart= new Schema({
    userName:{
        type:String
    },
    cartNumber:{
        type:Number,
        required: true 
    },
    totel:{
       type:Number
    }


})
module.exports=mongoose.model('BankCart',bankcart)