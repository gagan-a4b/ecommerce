const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { jwt: jwtConfig } = require('../config/config');

const AuthService = {
  async register(userData) {
    const user = await UserModel.create(userData);
    const token = this.generateToken(user.user_id);
    return { user, token };
  },

  async login(email, password) {
    const user = UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await UserModel.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.generateToken(user.user_id);
    return { user: userWithoutPassword, token };
  },

  getUserById(userId) {
    return UserModel.findById(userId);
  },

  async updateUser(userId, updateData) {
    return await UserModel.update(userId, updateData);
  },

  generateToken(userId) {
    return jwt.sign({ id: userId }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });
  }
};

module.exports = AuthService;





