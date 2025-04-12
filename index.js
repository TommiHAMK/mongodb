const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const dbURI ='mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';

console.log(dbURI);

mongoose.connect(dbURI)
.then((result) =>
{
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});

const Product = require('./models/Product');

/*
const newProduct = new Product({
    name: 'Chair',
    price: 100
});

newProduct.save()
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
})
*/

/*
Product.find()
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
})
*/

/*
const getAll = async () => {
    try 
    {
        const result = await Product.find();
        console.log(result);
    }
    catch{
        console.log(err);
    }
}
getAll();
*/



