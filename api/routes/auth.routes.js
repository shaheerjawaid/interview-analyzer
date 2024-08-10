const { Router } = require('express');
const router = Router();

router.post('/auth/signup', (request, response) => {
    response.status(200).json({ message: "SignUp API Working" });
});

router.post('/auth/signin', (request, response) => {
    response.status(200).json({ message: "SignIn API Working" });
});

router.post('/auth/forgot-password', (request, response) => {
    response.status(200).json({ message: "Forgot Password API Working" });
});

router.post('/auth/reset-password/:token', (request, response) => {
    response.status(200).json({ message: "Reset Password API Working" });
});

module.exports = router;