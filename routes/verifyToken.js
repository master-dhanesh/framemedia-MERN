const jwt = require('jsonwebtoken');
const secretKey = require('../model/keys').secretKey;

module.exports = function (req, res, next){
    const token =  req.header('auth-token');
    if(!token) return res.status(401).json('Access Denied');
    try {
      const verified = jwt.verify(token, secretKey);
      req.user = verified.user;
      next();
    } catch (error) {
      let message;
      if(!req.user) message = 'user not found';
      else message = error;        
      res.status(400).json(message);
    }
  }