const passport = require('passport')
module.exports = function(req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // add user to request
      req.user = user;
      next();
    })(req, res, next);
  };
  