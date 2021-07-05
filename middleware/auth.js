const jwt = require ("jsonwebtoken");

//vérification de la validité du token
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId != userId){
            throw 'Mauvais ID utilisateur !'
        }
        else{ 
            next();
        }
    }
    catch (error){
        res.status(401).json({
           error : new Error('La requête est invalide !')

        });
    }

}