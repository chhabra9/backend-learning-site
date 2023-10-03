const router = require('express').Router();
const {verifyTokenAndUser} = require('../services/verifyToken');
const {getAllCartItemsController,updateCartController} = require('../controller/cart.controller');
router.get('/:user_id',verifyTokenAndUser,getAllCartItemsController);
router.put('/:user_id',verifyTokenAndUser,updateCartController);
module.exports =router;