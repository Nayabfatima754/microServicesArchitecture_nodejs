const mongoose = require('mongoose')

const customer = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    agr:{
        type:Number,
        required:false
    },
    address:{
        type:String,
        required:true
    },
    
})
const Customer = mongoose.model('Customer',customer)
module.exports=Customer