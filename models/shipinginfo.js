const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shipinginfo= new Schema({
    idUser:{
        type:String
    },
    totalePrice:{
        type:Number
    },
    location:{
        type:String
    },
    userName:{
        type:String
    },
    Phonenumber:{
        type:Number
    }

})

module.exports=mongoose.model('Shipinginfo',shipinginfo)