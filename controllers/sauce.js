
const Sauce = require('../models/sauce');
const fs = require('fs');
const sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      likes : "0",
      dislikes : "0",
      usersLiked : [],
      usersDislikes : [],
      imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(res.status(201).json({ message : "Sauce créée avec succès !"}))
      .catch(error => res.status(400).json({ error}))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error}))
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
      .then(sauces => res.status(200).json({message : "sauce modifiée"}))
      .catch(error => res.status(400).json({ error}))
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id : req.params.id})
          .then(() => res.status(200).json({message : "sauce supprimée !"}))
          .catch(error => res.status(400).json({ error}));
        })
      })
      .catch(error => res.status(500).json({ error }));    
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error}))
};

 // système de like

 exports.voteSauce = (req, res, next) => {
    const vote = req.body.like;
    switch(vote){

          case 1 :
            console.log("oui enfin") 
            Sauce.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
              $push : { usersLiked : req.body.userId}
            })
                .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
                .catch(error => res.status(500).json({ message: "error case 1"}))       
          break;

          case -1 :
            console.log("ça mets bien moins")
            Sauce.updateOne({_id : req.params.id}, {
              $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
            })
                .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
                .catch(error => res.status(500).json({message:" error case -1"}))
          break;

          case 0 :  
          console.log("ca annule")
            Sauce.findOne({_id : req.params.id})
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId)){
                      Sauce.updateOne({_id : req.params.id}, {
                        $pull : { usersLiked : req.body.userId}, $inc : {likes : -1 }
                      })
                        .then(() => res.status(201).json({message : "j'aime a été retiré !"}))
                        .catch(error => res.status(500).json({message:" error enlèvement du j'aime"}))
                    }
                    else{
                      Sauce.updateOne({_id : req.params.id}, {
                        $pull : { usersDisliked : req.body.userId}, $inc : {dislikes : -1 }
                      })
                        .then(() => res.status(201).json({message : "je n'aime pas été retiré !"}))
                        .catch(error => res.status(500).json({message:" error enlèvement du je n'aime pas"}))
                    }

                }) 
                .catch(error => res.status(500).json({ message : "error case 0"}))
          break;  
            
          default : console.log("ça arrive sur le défault")
      }
    
}

//// NE PAS Y PRETER ATTENTION A LA PARTIE D'APRES :) ////
/*
22/06
 exports.voteSauce = (req, res, next) => {
    const vote = req.body.like;
    Sauce.findOne({_id : req.params.id})
      .then( sauce => {
        switch(vote){

          case 1 :
            console.log("oui enfin") 
            Sauce.updateOne({_id : req.params.id}, {$inc : {likes : +1 },
              $push : { usersLiked : req.body.userId}
            })
                .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
                .catch(error => res.status(500).json({ message: "error case 1"}))       
          break;

          case -1 :
            console.log("ça mets bien moins")
            Sauce.updateOne({_id : req.params.id}, {
              $push : { usersDisliked : req.body.userId}, $inc : {dislikes : +1 }
            })
                .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
                .catch(error => res.status(500).json({message:" error case -1"}))
          break;

          case 0 :  
          console.log("ca annule")
            Sauce.updateOne({_id : req.params.id}, { 
              $pull : { usersLiked : req.body.userId, usersDisliked : req.body.userId}, $inc:{cancel : +1}
            })
                .then(() => res.status(201).json({message : "vote réinitialisé"}))
                .catch(error => res.status(500).json({ message : "error case 0"}))
          break;  
            
          default : console.log("ça arrive sur le défault")
      }
      
  })      

  .catch(error => res.status(500).json({ message : "ça n'a pas swicthé"}))
}





Bout de code fonctionnel pour inc et push j'aime
 Sauce.updateOne({_id : req.params.id}, {
        $push : { usersLiked : req.body.userId},$inc : {likes : 1 }
      })
      .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
      .catch(error => res.status(500).json({ error}))
 * 
 * 
 * usersLiked.find().forEach(id => { 
        if(id == userId) {
          res.status(401).json({message : "l'utilisateur aime déjà !"})
          // console.log("oui enfin") 
          // Sauce.updateOne({_id : req.params.id}, { 
          //   $push : { usersLiked : req.body.userId},$inc : {likes : 1 }
          // })
          // .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
          // .catch(error => res.status(500).json({ error}))
        }
        
        else{
          console.log("oui enfin") 
          Sauce.updateOne({_id : req.params.id}, {
            $push : { usersLiked : req.body.userId},$inc : {likes : 1 }
          })
          .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
          .catch(error => res.status(500).json({ error}))
            // console.log("uilisateur aime déjà")
            // res.status(401).json({message : "l'utilisateur aime déjà !"})
        }  
 * 
 */
