const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/addProduct', shopController.addProduct);
router.get('/getElectronics', shopController.getElectronics);
router.post('/addtoCart', shopController.addtoCart);
router.post('/getCartProducts', shopController.getCartProducts);
router.post('/deleteFromCart', shopController.deleteFromCart);

module.exports = router;
