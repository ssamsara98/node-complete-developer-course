const User = require('../models/user');

const authMw = (req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  return User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      return next();
    })
    .catch((err) => {
      return next(new Error(err));
    });
};

module.exports = authMw;
