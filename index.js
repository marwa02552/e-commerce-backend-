const express = require('express')
const app = express()


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser())


//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/store?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0').
then(()=>{
    console.log('connect to data base')
})
.catch((errore)=>{
    console.log(errore)
})

//user router
const user=require('./route/userroute')
app.use('/',user)

const product=require('./route/productroute')
app.use('/',product)


const creaditcard=require('./route/creaditcardRoute')
app.use('/',creaditcard)

app.use(express.json())
//run the app on port 5000
app.get('/',(req,res)=>{
    res.send('welocom express')
})
const port=5000
app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})

