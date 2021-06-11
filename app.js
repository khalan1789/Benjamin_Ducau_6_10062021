const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const path = require('path');

const Sauce = require('./models/sauce');

const app = express();

mongoose.connect('mongodb+srv://Benjamin_Ducau:!Solymar37!@cluster0.vaqax.mongodb.net/Piquante?retryWrites=true&w=majority',
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

app.post('/api/sauces',(req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
    .then(res.status(201).json({ message : "sauce créée avec succès !"}))
    .catch(error => res.status(400).json({ error}))
  });

app.put('/api/sauces/:id',(req, res, next) => {
  Sauce.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(sauces => res.status(200).json({message : "sauce modifiée"}))
    .catch(error => res.status(400).json({ error}))
});

app.delete('/api/sauces/:id',(req, res, next) => {
  Sauce.deleteOne({_id : req.params.id})
    .then(sauce => res.status(200).json({message : "sauce supprimée !"}))
    .catch(error => res.status(400).json({ error}))
});

app.get('/api/sauces/:id',(req, res, next) => {
    Sauce.findOne({_id : req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error}))
  });

app.get('/api/sauces',(req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json({sauces}))
    .catch(error => res.status(400).json({ error}))
});








// app.post('/api/sauces',(req, res,next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'Objet créé !'
//   });
  
// });

// app.get('/api/sauces',(req, res,next) => {
//   data.find()
//   .then(console.log(data))
//   console.log(res.json(data))
//   // Sauce.find()
//   //   .then(sauces => res.status(208).json({sauces}))
//   //   .catch(error => res.status(404).json({error}))
// });

// app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;


//lien de connexion mongoDB au cas ou
//en version myfristdatabase

// mongodb+srv://Benjamin_Ducau:<password>@cluster0.vaqax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority