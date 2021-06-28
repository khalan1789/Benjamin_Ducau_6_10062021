const rateLimit = require("express-rate-limit");

//limite d'utilisation de requêtes à 150 max par quart d'heure

const limiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 150,

});

module.exports = limiter;

