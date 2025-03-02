const TelegramBot = require("node-telegram-bot-api");
const User = require("../models/User");

class Notificatoins {
  async createdNewObject(options) {
    // console.log(options);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, objectID } = options;

    const realtor = await User.findById(userId);

    if (realtor?.userId) {
      await bot.sendMessage(realtor?.userId, "Вам призначено новий об`єкт", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Переглянути інформацію про об`єкт",
                callback_data: `objectMethods_printInfo-${objectID}`,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      });
    }

    bot = null;
  }

  async deletedObject(options) {
    // console.log(options);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, objectID } = options;

    const realtor = await User.findById(userId);

    if (realtor?.userId) {
      await bot.sendMessage(realtor?.userId, "Вам призначено новий об`єкт", {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Переглянути інформацію про об`єкт",
                callback_data: `objectMethods_printInfo-${objectID}`,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      });
    }

    bot = null;
  }
}

module.exports = new Notificatoins();
