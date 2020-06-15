// middleware for doing role-based permissions
module.exports = function permit(...allowed) {
    const isAllowed = (role) => allowed.indexOf(role) > -1;

    // return a middleware
    return (request, response, next) => {
        if ((request.user && isAllowed(request.user.role))
            || (isAllowed('owner') && request.user.id === request.query.clientId)) {
            next();
        } else {
            response.status(403).json({ message: 'Forbidden' });
        }
    };
};
