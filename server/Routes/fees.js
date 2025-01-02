const router = (require('express')).Router()
const feesController = new (require('../Controllers/fees'));

const Authentication = new (require("../Middleware/authentication"))
const userAuth = Authentication.userAuth;

// For pay fees
router.route('/payment').post(userAuth,feesController.payFees);

//confirm fess
router.route('/confirm').post(userAuth,feesController.payment);




module.exports = router