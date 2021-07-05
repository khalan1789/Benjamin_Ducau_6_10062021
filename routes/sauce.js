const express = require('express');
const router = express.Router();

//middleware pour renforcer la sécurité sur les routes
const auth = require("../middleware/auth");

const multer = require("../middleware/config-multer");
const sauceCtrl = require("../controllers/sauce");

router.post('/', auth, multer, sauceCtrl.createSauce );

router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
router.delete('/:id', auth, sauceCtrl.deleteSauce);
  
router.get('/:id', auth, sauceCtrl.getOneSauce);
  
router.get('/', auth, sauceCtrl.getAllSauce);

router.post('/:id/like', auth, sauceCtrl.voteSauce);

module.exports = router;