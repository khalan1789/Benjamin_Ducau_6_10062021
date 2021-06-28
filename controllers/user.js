const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

//masquage de données via maskdata 
const MaskData = require("maskdata");


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : MaskData.maskEmail2(req.body.email),        //maskage du mail
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message : "création de l'utilisateur réussie !"}))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne({ email : MaskData.maskEmail2(req.body.email)})             //maskage du mail
        .then(user => {
            if(!user){
                res.status(401).json({ error : " Utilisateur non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid){
                        res.status(401).json({ error : " Mot de passe incorrect !" })
                    }
                    res.status(200).json({ 
                        userId : user._id,
                        token : jwt.sign(
                            {userId : user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn : '24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

