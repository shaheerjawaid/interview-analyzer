const { verifyToken } = require("../utils/jwt");
const Users = require("../../models/users.model");

exports.authGuard = async (request, response, next) => {
	try {
		const header = request.headers?.authorization;
        if (!header) return response.status(404).json({ message: "Authorization header is missing" });

        const tokenParts = header.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') return response.status(422).json({ error: "Invalid token format" });

        const token = tokenParts[1];
		if (!token) return response.status(404).json({ message: "Access token is missing" });

        const { payload } = verifyToken(token);
        const user = await Users.findById(payload);

		if (!user) return response.status(401).json({ message: "Unauthorized" });

        request['user'] = user;
		return next();
	} catch (error) {
        request['user'] = null;
		response.status(500).json({ message: "Invalid access token" });
	}
};