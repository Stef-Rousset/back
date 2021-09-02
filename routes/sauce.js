const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, multer, sauceController.deleteSauce);
router.post('/:id/like', auth, multer, sauceController.likeSauce);
router.get('/:id', auth, multer, sauceController.getOneSauce);
router.get('/', auth, multer, sauceController.getAllSauces);

module.exports = router;
