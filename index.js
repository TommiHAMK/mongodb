const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars'); 

const dbURI ='mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';
//console.log(dbURI);


mongoose.connect(dbURI)
.then((result) =>
{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Listening on port ' + PORT));
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



app.get('/api/products', async (req,res) => {
    try {
        const result = await Product.find();
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
});

app.get('/api/products/:id', async (req,res) => {
    const id = req.params.id;
        const product = await Product.findById(id);
        res.json(product);
});


// Find products from the MongoDB and print to the webpage
app.get('/products' , async (req,res) => {
    try {
        const result = await Product.find();
        //res.json(result);
        res.render('products',
            {
                title: 'Our Products'
            }
        )
    }
    catch (error) {
        res.status(404).render('products', {
            title: 'Something is wrong'
        })
        console.log(error);
    }
});

app.get('/', (req,res) => {
    res.render('index');
});

