
const Sauce = require('../models/sauce');
const fs = require('fs');

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
      .then(sauces => res.status(200).json({sauces}))
      .catch(error => res.status(400).json({ error}))
};

 // système de like
 exports.voteSauce = (req, res, next) => {
  Sauce.findOne({_id : req.params.id})
    .then(sauce => {
      console.log(sauce)
      console.log(req.body)
      res.status(201).json({ message : "i know you like it"})
    })
    .catch(error => res.status(405).json({message : "errrrrrreeeeuur"}))

  // console.log(req.body)
  // res.status(666).json({message : "test du like !"})
 /*const vote = req.body.like;
    const sauce = req.body;
      if (vote = 1){
        // if(!sauce.usersLiked[userId]){
          Sauce.updateOne({_id : req.params.id}, {
           $push : { usersLiked : sauce.userId}
          })
            .then(() => res.status(201).json({message : "j'aime ajouté"}))
            .catch(error => res.status(500).json({ error}))
            
        // // }
        // else{
        //   console.log("l'utilisateur a déjà cliqué sur j'aime!")
        // }
      }
      else if (vote = -1){
        // if(!sauce.usersDislikes[userId]){
          Sauce.updateOne({_id : req.params.id}, {
            $push : { usersLiked : sauce.userId}
           })
             .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
             .catch(error => res.status(500).json({ error}))
             
        // // }
        // else{
        //   console.log("l'utilisateur a déjà cliqué sur je n'aime pas...!")
        // }
      }
      else if(vote = 0){
        // supprimer l'id user du tableau dans lequel il était et mettre -1 dans le total de ce tableau là
        // : array fonction mongoDb à voir.
        Sauce.updateOne({_id : req.params.id}, {
          $pull : { usersLiked : sauce.userId, usersDisliked : sauce.userId}
         })
           .then(() => res.status(201).json({message : "vote réinitialisé"}))
           .catch(error => res.status(500).json({ error}))
           
        console.log("pas encore pret")
      }
    */
    
    // .catch( error => res.status(500).json({ error}))
}

// if (vote = 1){
//   if(il n'y a pas l'user dans le tableau des likes){
//   //mettre la fonction pour ajouter l'id au tableau like
//   likes +=1
//   }
//   else{
//     console.log("l'utilisateur a déjà cliqué sur j'aime!")
//   }
// }

// if (vote = -1){
//   if(il n'y a pas l'user dans le tableau des likes){
//   //mettre la fonction pour ajouter l'id au tableau like
//   dislikes +=1
//   }
//   else{
//     console.log("l'utilisateur a déjà cliqué sur je n'aime pas...!")
//   }
// }

// if(vote = 0){
//   supprimer l'id user du tableau dans lequel il était et mettre -1 dans ce tableau là
//   : array fonction mongoDb à voir.
// } 
