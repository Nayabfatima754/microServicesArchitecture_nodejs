const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const connectDB = require('./db')
const router = require('./router')
const cors = require('cors');
app.use(cors());

connectDB()


app.use(express.json())
app.use('/Orders',router)
app.get('/',(req,res)=>{
    res.status(200).json({message:"welcome"})
})


app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})