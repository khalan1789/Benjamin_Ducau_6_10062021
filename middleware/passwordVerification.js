const passwordSchema = require("../models/password");

//contrôle du mot de passe rentré par l'utilisateur afin qu'il soit fort
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({ error : "le mot de passe n'est pas assez fort : " + passwordSchema.validate(req.body.password, {list : true})});
        console.log("Le mot de passe n'est pas assez fort!")
    }
    else{
        next();
    }
}
