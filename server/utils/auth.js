const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.query or headers
    let token = req.headers.authorization || '';

    // ["Bearer", "<tokenvalue>"]
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (error) {
      console.error('Invalid token:', error);
      throw new AuthenticationError('Invalid token');
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};