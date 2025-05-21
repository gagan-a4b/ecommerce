const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { users } = require('../utils/mockData');

const UserModel = {
  async create(userData) {
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
      user_id: userData.user_id || uuidv4(),
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      name: userData.name || '',
      created_at: new Date(),
      updated_at: new Date()
    };

    users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  findById(userId) {
    const user = users.find(user => user.user_id === userId);
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  findByEmail(email) {
    const user = users.find(user => user.email === email);
    return user || null;
  },

  findByUsername(username) {
    return users.find(user => user.username === username) || null;
  },

  async update(userId, updateData) {
    const userIndex = users.findIndex(user => user.user_id === userId);
    if (userIndex === -1) return null;

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updated_at: new Date()
    };

    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = UserModel;

