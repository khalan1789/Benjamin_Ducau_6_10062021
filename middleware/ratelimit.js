const rateLimit = require("express-rate-limit");

//limite d'utilisation de requêtes à 100 max par quart d'heure
// module.exports = (req, res, next) => {rateLimit({
//     windowMs : 15 * 60 * 1000,
//     max : 100,
//     message : "Trop de requêtes effectuées! Veuillez réessayer plus tard"
// })
//}
const limiter = rateLimit({
    windowMs : 10 * 60 * 1000,
    max : 100,

});

module.exports = limiter;

