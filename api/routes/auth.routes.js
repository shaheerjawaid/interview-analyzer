const { Router } = require('express');
const { signup, verifyEmail, verifyPassword, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/verify-email', verifyEmail);
router.post('/auth/verify-password', verifyPassword);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password/:token', resetPassword);

module.exports = router;