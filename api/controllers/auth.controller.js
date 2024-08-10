const { createHash } = require('crypto');
const { handleValidation } = require('../common/utils/handleValidation');
const { generateToken } = require('../common/utils/jwt');
const Users = require('../models/users.model');


// ========== SignUp ==========
exports.signup = async (request, response) => {
    try {
        await Users.create(request.body);
        response.status(201).json({ message: "SignUp Successfull. Please SignIn to continue" });
    } catch (error) {
        const { status, message } = handleValidation(error, "users");
        response.status(status).json({ message });
    }
}


// ========== Verify Email ==========
exports.verifyEmail = async (request, response) => {
    try {
        const user = await Users.findOne({ email: request.body?.email });
        if (!user) return response.status(422).json({ message: "Incorrect email" });
        return response.status(200).json({ message: "Email verified" });
    } catch (error) {
        return response.status(500).json({ message: "Failed to verify email" });
    }
}


// ========== Verify Password ==========
exports.verifyPassword = async (request, response) => {
    try {
        const user = await Users.findOne({ email: request.body?.email });
        if (!user || !(await user.isPasswordMatched(request.body?.password))) return response.status(422).json({ message: "Incorrect Password" });

        const accessToken = generateToken(user._id);
        return response.status(200).json({ message: "SignIn successfull", accessToken });
    } catch (error) {
        return response.status(500).json({ message: "Failed to SignIn" });
    }
}


// ========== Forgot Password ==========
exports.forgotPassword = async (request, response) => {
    try {
        const { email } = request.body;
        if (!email) return response.status(422).json({ message: "Email is required" });

        const user = await Users.findOne({ email });
        if (!user) return response.status(404).json({ message: "Sorry. Can't find your account" });

        const passwordToken = await user.generateResetPasswordToken();
        await user.save();

        return response.json({ passwordToken });
    } catch (error) {
        response.status(500).json({ message: "Failed to perform forgot password" });
    }
}


// ========== Reset Password ==========
exports.resetPassword = async (request, response) => {
    try {
        const { password } = request.body;
        const { token } = request.params;

        if (!password) return response.status(422).json({ message: "Password is required" });

        const hashedToken = createHash("sha256").update(token).digest("hex");

        const user = await Users.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
        if (!user) return response.status(401).json({ message: "Token Expired. Please try again later" });

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        response.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        response.status(500).json({ message: "Failed to reset password" });
    }
}