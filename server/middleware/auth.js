const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');

      req.user = decodedData?.id;
      console.log(req.user);
    } else {
      decodedData = jwt.decode(token);

      req.user = decodedData?.sub;
    }

    next();
  } catch (error) {}
};
