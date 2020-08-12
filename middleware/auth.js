const jwt = require('jsonwebtoken');
const cofig = require('config');

module.exports = function (req, res, next) {
  // check the headers to see if they have a token
  const token = req.header('x-auth-token');

  // If there is no token, display an error message
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verifies the token by decoding the token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
