const passwordValidator = require("password-validator")

const passwordSchema = new passwordValidator();

//mise en place des règles pour le mot de passe
passwordSchema
.is().min(8)                    //contient minimum 8 caractères
.has().uppercase()              //contient minimum 1 majuscule
.has().lowercase()              //contient minimum 1 minuscule
.has().digits()                 //contient minimum 1 chiffre
.has().not().spaces()           //ne contient pas d'espaces 
.is().not().oneOf(['Passw0rd', 'Password123','Azerty123'])    //refuse ces mots de passe

module.exports = passwordSchema;