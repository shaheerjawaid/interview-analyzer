exports.roleGuard = role => {
    return function (request, response, next) {
        try {
            if (role === request?.user.role) return next();
            response.status(403).json({ message: "You don't have permission to access this resource" });
        } catch (error) {
            response.status(500).json({ message: "Internal Server Error" });
        }
    };
}