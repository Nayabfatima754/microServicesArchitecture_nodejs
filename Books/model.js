const mongoose =require('mongoose')

const books = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    numberOfPages:{
        type:Number,
        required:false
    },
Publisher:{
    type:String,
    required:false
}

})
const Books = mongoose.model('Books',books)
module.exports=Books