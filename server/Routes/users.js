const router = (require('express')).Router()
const userController = new (require('../Controllers/users'))

// sign in
router.route("/sign_in").post(userController.signIn);

module.exports = router