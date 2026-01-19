require('dotenv').config();

const bodyparser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const connectDb = require('./config/db')

const app = express ();

app.use(cors());
app.use(express.json());

const hostname = process.env.HOST;
const port = process.env.PORT;

connectDb()

const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI)
 .then(()=>console.log('MongoDb connected'))
 .catch(err =>console.error('Mongo connection error : ', err))

app.get('/',(req,res)=> {
    res.send("the Api is running");
})

app.listen(port,() =>{
    console.log(`server is running at http://${hostname}:${port}/`)
})