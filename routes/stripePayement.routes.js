const router = require('express').Router();
const{createPayementIntentController,createCheckOutSessionController,webHookController} = require('../controller/stripePayement.controller');
router.post('/payment-intent',createPayementIntentController);
router.post('/checkout-session',createCheckOutSessionController);
router.post('/webhook',webHookController);
module.exports = router;