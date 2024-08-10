const { Router } = require('express');
const { signup, verifyEmail, verifyPassword, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/verifyEmail', verifyEmail);
router.post('/auth/verifyPassword', verifyPassword);
router.post('/auth/forgotPassword', forgotPassword);
router.post('/auth/resetPassword/:token', resetPassword);

module.exports = router;