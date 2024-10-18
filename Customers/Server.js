const express = require('express')
const app = express()
const PORT = process.env.PORT || 4545;
const connectDB = require('./db')
const router = require('./router')
connectDB()


app.use(express.json())
app.use('/Customers',router)
app.get('/',(req,res)=>{
    res.status(200).json({message:"welcome"})
})


app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})