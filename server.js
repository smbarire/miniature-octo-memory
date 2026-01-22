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

const products = require('./models/product')

connectDb()

const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI)
 .then(()=>console.log('MongoDb connected'))
 .catch(err =>console.error('Mongo connection error : ', err))

app.get('/',(req,res)=> {
    res.send("the Api is running");
})

app.get('/api/products', async(req, res)=> {
    try {
        const products = await products.find();
        res.status(200).json(products);
     } catch (error)  {
        console.error("error fetching users:", error);
        res.status(500).json({message: "internal server"}):
     }
});

app.listen(port,() =>{
    console.log(`server is running at http://${hostname}:${port}/`)
});
app.post("/api/products", async (req, res) => {
    try{
        const newproducts = new products(req.body);
        const savedproduct = await newproducts.save();
        res.status(201).json(savedproduct)
    }catch(error) {
        console.error("error saving product:" , error);
        res.status(500).json({message : 'internal server error'})
    }
      
})