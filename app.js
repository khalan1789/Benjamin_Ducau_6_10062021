const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const path = require('path');
const rateLimit = require("./middleware/ratelimit");
const helmet = require("helmet");
const cookieSession = require("cookie-session");


const URL_PATH = process.env.db; 
const sauceRoutes = require('./routes/sauce');
const auth = require('./routes/user'); 

const app = express();

//mise en place d'une écoute maximum des requêtes
app.use(rateLimit);

//mise en place protection xss
app.use(helmet());

mongoose.connect(URL_PATH,
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

//mise en place des cookies en http only
app.use(cookieSession({
  secret: "sessionS3cur3",
  cookie : {
    secure : true,
    httpOnly : true,
    domain : "http://localhost:3000"
  }
}))


app.use(express.json());

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', auth);



module.exports = app;

