const User = require("../models/User");

class UserService {
  async createUser(options) {
    console.log(options);

    if (!options?.userId || !options?.username) {
      throw new Error("Invalid data sent");
    }

    return await User.create(options);
  }

  async getUserByTelegramId(userId) {
    if (!userId) {
      throw new Error("Invalid data sent");
    }

    return await User.findOne({ userId });
  }

  async getUserByTelegramUsername(username) {
    if (!username) {
      throw new Error("Invalid data sent");
    }

    return await User.findOne({ username });
  }

  async getUser(userId) {
    if (!userId) {
      throw new Error("Invalid data sent");
    }

    return await User.findById(userId);
  }
}

module.exports = new UserService();
