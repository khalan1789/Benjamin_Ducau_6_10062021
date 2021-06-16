const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const path = require('path');


const URL_PATH = process.env.URL_PATH; 
const sauceRoutes = require('./routes/sauce');
const auth = require('./routes/user'); //rajouté avant de couper

const app = express();

mongoose.connect(process.env.URL_PATH,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la bdd MongoDB réussie !'))
  .catch(() => console.log('Connexion à la bdd MongoDB échouée !'));
  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', auth);



module.exports = app;

