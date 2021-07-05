const rateLimit = require("express-rate-limit");

//limite d'utilisation de requêtes à 250 max par quart d'heure

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 250,

});

module.exports = limiter;

