module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key', 
    expiresIn: '7d' 
  },

  // You can add other configs like:
  port: process.env.PORT || 5000,
};
