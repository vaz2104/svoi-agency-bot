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
  async getThumbnail(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return "";

    const avatars = await bot.getUserProfilePhotos(id);

    if (avatars?.photos[0]) {
      return await bot.getFileLink(avatars?.photos[0][0]?.file_id);
    }
    bot = null;
    return "";
  }

  async updateProfile(id, options) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    const updatedProfile = await User.findByIdAndUpdate(id, options, {
      new: true,
    });

    if (updatedProfile?._id && options?.isActivated !== undefined)
      Notificatoins.realtorProfileStatus({
        userId: updatedProfile?._id,
        chatId: updatedProfile?.userId,
        status: updatedProfile?.isActivated,
      });

    return updatedProfile;
  }
}

module.exports = new RealtorsService();
