const User = require("../models/User");
const Auth = require("../models/Auth");
const generateRandomKey = require("../lib/generateRandomKey");

class AuthService {
  async createKey(userId) {
    if (!userId) {
      throw new Error("Invalid data sent");
    }

    await Auth.deleteMany({ userId });

    const key = generateRandomKey(5, true);

    return await Auth.create({
      userId: userId,
      key,
    });
  }
  async login(options) {
    if (!options?.username || !options.key) {
      throw new Error("Invalid data was sent"); // 400
    }

    console.log(options);

    const telegramUser = await User.findOne({
      username: options?.username,
    });

    if (!telegramUser) return null;

    const authData = await Auth.findOne({
      userId: telegramUser._id,
      key: options.key,
    });

    await Auth.deleteMany({ userId: telegramUser._id });
    if (!authData) return null;

    return telegramUser;
  }
}

module.exports = new AuthService();
