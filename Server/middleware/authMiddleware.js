const passport = require('passport');
module.exports = function(req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        if (err) return next(err);
        if (!user && req.path !== "/search") { 
            // if user is unauthorized and the request is not for '/search'
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // add user to request if user exists
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};
