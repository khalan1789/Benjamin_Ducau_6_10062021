const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

// const Sauce = require('./models/sauce');

const app = express();

mongoose.connect('mongodb+srv://Benjamin_Ducau:!Solymar37!@cluster0.vaqax.mongodb.net/Piquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/sauces',(req, res,next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
  
});

app.get('/api/sauces',(req, res,next) => {
  res.status(333).json(req.body)
 
  // Sauce.find()
  //     .then(sauces => res.status(200).json({sauces}))
  //     .catch(error => res.status(404).json({error}))
});

// app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;


//lien de connexion mongoDB au cas ou
//en version myfristdatabase

// mongodb+srv://Benjamin_Ducau:<password>@cluster0.vaqax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority