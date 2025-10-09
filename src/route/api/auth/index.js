const express = require('express');
const {signupControllers, verifyOtpControllers, loginControllers, allusersControllers} = require('../../../controllers/signupControllers');
const { authMiddleware, TokenCheckMiddleware, adminCheckMiddleware } = require('../../../utils/authMiddleware');
const router = express.Router();

router.post('/signup', signupControllers);
router.post('/verify-otp', verifyOtpControllers );
router.post ('/login', loginControllers);
router.get ('/allusers', allusersControllers )

module.exports = router;