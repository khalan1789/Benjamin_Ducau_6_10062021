
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
      .then(sauces => res.status(200).json({sauces}))
      .catch(error => res.status(400).json({ error}))
};

 // système de like

 exports.voteSauce = (req, res, next) => {
  console.log(req.body.userId )
  const vote = req.body.like;
  sauce.findOne({_id : req.params.id})
  .then( sauce => {
  switch(vote){
    case "1" : //console.log("j'aime")
    // res.status(201).json({message : "j'aime ok"})
      Sauce.updateOne({_id : req.params.id}, {
               $push : { usersLiked : req.body.userId}
            }, {$inc : {likes : +1 }})
            .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
            .catch(error => res.status(500).json({ error}))
            break;
    case "-1" : // console.log("j'aime pas")
    // res.status(201).json({message : "j'aime pas c'est bon"})
      Sauce.updateOne({_id : req.params.id}, {
        $push : { usersDisliked : req.body.userId}, /*$inc : {dislikes : +1 }*/
      })
            .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
            .catch(error => res.status(500).json({ error}))
            break;   
  }
})
  .catch(error => res.status(500).json({ message : "ça n'a pas swicthé"}))
}

//// NE PAS Y PRETER ATTENTION A LA PARTIE D'APRES :) ////
//  exports.voteSauce = (req, res, next) => {
//   Sauce.findOne({_id : req.params.id})
//     .then(sauce => {
//       const vote = req.body.like;
//       switch(vote){
//         case vote = 1 :
//           // if(!sauce.usersLiked[req.params.userId]){
//             Sauce.updateOne({_id : req.params.id}, {
//                $push : { usersLiked : sauce.userId}, /* $inc : {likes : +1 } */
//             })
//             .then(() => res.status(201).json({message : "USER DE j'aime ajouté"}))
//             .catch(error => res.status(500).json({ error}))
              
//           // }
//           // else{
//           //   console.log("l'utilisateur a déjà cliqué sur j'aime!")
//           // };
//           break;
      
//         case vote = -1 :
//           // if(!sauce.usersDislikes[req.params.userId]){
//             Sauce.updateOne({_id : req.params.id}, {
//               $push : { usersDisliked : sauce.userId}, /* $inc : {likes : -1 }*/
//             })
//               .then(() => res.status(201).json({message : "je n'aime pas ajouté"}))
//               .catch(error => res.status(500).json({ error}))   
//           // }
//           // else{
//           //   console.log("l'utilisateur a déjà cliqué sur je n'aime pas...!")
//           // }
//           break;
//         case vote = 0 :
//           // supprimer l'id user du tableau dans lequel il était et mettre -1 dans le total de ce tableau là
//           // : array fonction mongoDb à voir.
//           Sauce.updateOne({_id : req.params.id}, {
//              $pull : { usersLiked : sauce.userId, usersDisliked : sauce.userId}
//           })
//             .then(() => res.status(201).json({message : "vote réinitialisé"}))
//             .catch(error => res.status(500).json({ error}))
//           break;   
//       };       
//     })
//     .catch(error => res.status(500).json({error : error}))
// };
  
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

/****************AVANT DE TESTER LE SWITCH
 * 
 * 
 *exports.voteSauce = (req, res, next) => {
//Sauce.findOne({_id : req.params.id})
 * then(sauce => {
      console.log(sauce)
      console.log(req.body)
      res.status(201).json({ message : "i know you like it"})
    })
    .catch(error => res.status(405).json({message : "errrrrrreeeeuur"}))
 * 
 * 
 * 
 * 
 */
