const User = require("../models/User");
const Notificatoins = require("./Notificatoins");

class UserService {
  async createUser(options) {
    if (!options?.userId || !options?.username) {
      throw new Error("Invalid data sent");
    }

    const newUser = await User.create(options);

    if (newUser?._id) {
      await Notificatoins.createdNewRealtor();
    }

    return newUser;
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
