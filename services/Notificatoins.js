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
    return false;
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

  async realtorProfileStatus(options) {
    // console.log(options);

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const { userId, chatId, status } = options;

    if (status) {
      await bot.sendMessage(
        chatId,
        "Ваш профіль активовано!\nТепер Ви можете переглядати інформацію про призначені Вам об`єкти",
        {
          parse_mode: "HTML",
        }
      );
    } else {
      await bot.sendMessage(
        chatId,
        "Ваш профіль <b>заблоковано</b>, та всі Ваші дії в боті обмежені!\n ",
        {
          parse_mode: "HTML",
        }
      );
    }

    bot = null;
  }

  async createdNewRealtor() {
    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const realtors = await User.find({
      role: "admin",
    });

    if (realtors?.length) {
      Promise.all(
        realtors.map(async (realtor) => {
          if (realtor?.userId) {
            await bot.sendMessage(
              realtor?.userId,
              "У боті зареєструвався новий рієлтор!\n\nПерейдіть в адмін-панель та перевірте дані користувача",
              {
                parse_mode: "HTML",
              }
            );
          }
        })
      ).then(() => {
        return console.log("Success!");
      });
    }

    bot = null;
  }
}

module.exports = new Notificatoins();
