const express = require('express');
const {signupControllers, verifyOtpControllers} = require('../../../controllers/signupControllers');
const router = express.Router();

router.post('/signup', signupControllers);
router.post('/verify-otp', verifyOtpControllers );

module.exports = router;