require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/Users');

const auth = (req, resp, next) =>{
  const token = req.cookies.jwt;
  if (token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) =>{
      if (err){
        resp.locals.user = null; 
        next();
      }else {
        const user = await User.findById(decoded.id);
        resp.locals.user = user; 
        next();
      }
    })
  }else {
    resp.locals.user = null; 
    next();
  }
}
module.exports = auth;