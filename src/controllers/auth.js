const Jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader;

    console.log('auth-header--', req.headers.authorization);
  
    if (token == null) {
      return res.sendStatus(401);
    }
  
    Jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token Expired' });
      }
      req.user = user;
      console.log('authenticate', req.user)
      next();
    });
}

module.exports = {authenticateToken }