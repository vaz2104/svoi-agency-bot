const TelegramBot = require("node-telegram-bot-api");
const User = require("../models/User");
const Notificatoins = require("./Notificatoins");

class RealtorsService {
  async getAll(query) {
    if (query?.userId || query?.username) {
      return await User.findOne(query);
    }

    return await User.find();
  }

  async getSingle(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    return await User.findById(id);
  }
  async updateProfile(id, options) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    const updatedProfile = await User.findByIdAndUpdate(id, options, {
      new: true,
    });

    if (updatedProfile?._id)
      Notificatoins.realtorProfileStatus({
        userId: updatedProfile?._id,
        chatId: updatedProfile?.userId,
        status: updatedProfile?.isActivated,
      });

    return updatedProfile;
  }
}

module.exports = new RealtorsService();
