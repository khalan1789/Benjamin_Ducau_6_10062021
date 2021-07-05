// Modules requis 
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

//modules pour la sécurité
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const rateLimit = require("./middleware/ratelimit");
const dotenv = require("dotenv").config();

//masquage de l'url de la base de donnée via fichier dotenv
const URL_PATH = process.env.db; 

//paramètres des routes sauce
const sauceRoutes = require('./routes/sauce');

//paramètre pour renforcer l'authentification de l'utilisateur
const auth = require('./routes/user'); 

//initialisation de l'application express
const app = express();

//mise en place d'une écoute maximum des requêtes
app.use(rateLimit);

//mise en place protection des en-têtes HTTP grâce à Helmet
app.use(helmet());

//connexion à MongoDB
mongoose.connect(URL_PATH,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à la bdd MongoDB réussie !'))
  .catch(() => console.log('Connexion à la bdd MongoDB échouée !'));

//configuration des en-têtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//mise en place des cookies en http only
app.use(cookieSession({
  secret: "sessionS3cur3",
  cookie : {
    secure : true,
    httpOnly : true,
    domain : "http://localhost:3000"
  }
}))

//Parser les requêtes en json
app.use(express.json());

//gestion des images dans un dossier image statique
app.use('/images', express.static(path.join(__dirname,'images')));

//Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', auth);


module.exports = app;

