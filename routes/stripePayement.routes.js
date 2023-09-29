const router = require('express').Router();
const{createPayementIntentController,createCheckOutSessionController,webHookController} = require('../controller/stripePayement.controller');
const { verifyTokenAndUser } = require('../services/verifyToken');
router.post('/payment-intent',createPayementIntentController);
router.post('/checkout-session',verifyTokenAndUser,createCheckOutSessionController);
router.post('/webhook',webHookController);
module.exports = router;