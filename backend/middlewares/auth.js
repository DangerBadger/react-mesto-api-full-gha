const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const STATUS = require('../utils/constants/status');
const Unauthorized = require('../utils/errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw (new Unauthorized(STATUS.UNAUTHORIZED_USER));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized(STATUS.UNAUTHORIZED_USER));
  }

  req.user = payload;

  next();
};
