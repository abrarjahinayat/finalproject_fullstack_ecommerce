const express = require('express');
const {signupControllers, verifyOtpControllers, loginControllers, allusersControllers, verifyUserControllers} = require('../../../controllers/signupControllers');
const {  TokenCheckMiddleware, adminCheckMiddleware } = require('../../../utils/authMiddleware');
const router = express.Router();

router.post('/signup', signupControllers);
router.post('/verify-otp', verifyOtpControllers );
router.post ('/login', loginControllers);
router.get ('/allusers',TokenCheckMiddleware, adminCheckMiddleware, allusersControllers )

router.get ('/verifyUser', verifyUserControllers )

module.exports = router;