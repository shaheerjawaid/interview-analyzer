const { sign, verify } = require('jsonwebtoken');

exports.generateToken = payload => {
    return sign({ payload }, process.env.JWT_SECRET, {expiresIn: '1d'});
}

exports.verifyToken = token => {
    return verify(token, process.env.JWT_SECRET);
}