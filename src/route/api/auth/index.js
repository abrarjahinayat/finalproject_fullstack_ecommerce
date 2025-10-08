const express = require('express');
const {signupControllers, verifyOtpControllers, loginControllers} = require('../../../controllers/signupControllers');
const router = express.Router();

router.post('/signup', signupControllers);
router.post('/verify-otp', verifyOtpControllers );
router.post ('/login', loginControllers)

module.exports = router;