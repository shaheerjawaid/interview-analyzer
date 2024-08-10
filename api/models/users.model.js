const { Schema, model } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');
const { createHash, randomBytes } = require('crypto');
const { isAlpha, isEmail, isStrongPassword } = require('validator');

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [3, "First Name should be at least 3 characters long"],
            validate: {
                validator: value => isAlpha(value.replace(/\s+/g, ''), 'en-US'),
                message: "First Name allows only letters",
            },
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [3, "Last Name should be at least 3 characters long"],
            validate: {
                validator: value => isAlpha(value.replace(/\s+/g, ''), 'en-US'),
                message: "Last Name allows only letters",
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: [isEmail, "Email should be valid"],
            lowercase: [true, "Email should be lowercase"],
            unique: true,
            immutable: true
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            validate: [isAlpha, "Country allows only letters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: [isStrongPassword, "Password is too weak"],
        },
        role: {
            type: String,
            enum: ['@candidate~', '@hr~'],
            default: '@candidate~'
        },
        authType: {
            type: String,
            enum: ['Google', 'Apple', 'Manual'],
            default: 'Manual'
        },
        googleID: String,
        appleID: String,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);


// ========== Password Hashing ==========
UserSchema.pre('save', async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});


// ========== Password Matching ==========
UserSchema.methods.isPasswordMatched = async function (password) {
    if (!password) return false;
    return await compare(password, this.password);
}


// ========== Generating Reset Password Token ==========
UserSchema.methods.generateResetPasswordToken = async function () {
    const resetToken = randomBytes(32).toString("hex");
    this.passwordResetToken = createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = model('users', UserSchema);