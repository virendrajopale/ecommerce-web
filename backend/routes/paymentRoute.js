const express=require('express')
const router=express.Router()
const { isAuthenticatedUser, authorizRoles } = require('../middleware/auth');
const { processPayment, sendStripeApiKey,  } = require('../controllers/paymentController');

router.route("/process/payment").post(isAuthenticatedUser,processPayment)
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey)
module.exports=router;