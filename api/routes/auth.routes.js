const { Router } = require('express');
const router = Router();

router.post('/auth/signup', (request, response) => {
    response.status(200).json({ message: "SignUp API Working" });
});

router.post('/auth/verify-email', (request, response) => {
    response.status(200).json({ message: "Verify Email API Working" });
});

router.post('/auth/verify-password', (request, response) => {
    response.status(200).json({ message: "Verify Password API Working" });
});

router.post('/auth/forgot-password', (request, response) => {
    response.status(200).json({ message: "Forgot Password API Working" });
});

router.post('/auth/reset-password/:token', (request, response) => {
    response.status(200).json({ message: "Reset Password API Working" });
});

module.exports = router;