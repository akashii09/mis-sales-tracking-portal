const checkRole = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!roles.includes(req.user.Role)) {

            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};

module.exports = checkRole;