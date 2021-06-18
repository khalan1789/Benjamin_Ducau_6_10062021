const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/config-multer");
const sauceCtrl = require("../controllers/sauce");

router.post('/', auth, multer, sauceCtrl.createSauce );

// // route à mettre en place pour les likes
// router.post('/:id/like', auth, sauceCtrl.voteSauce);

router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
router.delete('/:id', auth, sauceCtrl.deleteSauce);
  
router.get('/:id', auth, sauceCtrl.getOneSauce);
  
router.get('/', auth, sauceCtrl.getAllSauce);

// route à mettre en place pour les likes
router.post('/:id/like', auth, sauceCtrl.voteSauce);

module.exports = router;