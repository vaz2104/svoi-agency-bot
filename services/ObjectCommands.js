const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("../lib/formatDate");
const formOptionsLabes = require("../lib/formOptionsLabes");
const RealestateService = require("./RealestateService");
const RealtorsService = require("./RealtorsService");

class ObjectCommands {
  async printInfo(chatId, objectID) {
    if (!objectID || !chatId) return;

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const realestate = await RealestateService.getSingle(objectID);

    if (!realestate?._id) return;

    const message = `<b>Клієнт</b>: ${realestate.clientName} (${
      realestate.clientPhone || " - "
    })\n<b>Деталі про об\`єкт</b>: ${
      realestate.objectDescription || " - "
    }\n<b>Локація (адреса об\`єкта)</b>: ${
      realestate.location
    }\n<b>Бюджет</b>: ${
      realestate.budget || " - "
    }\n<b>Дата реєстрації об\`єкта</b>: ${
      realestate.dateRegistration
        ? formatDate(realestate.dateRegistration)
        : "Дата не вказана"
    }\n<b>Тип операції</b>: ${
      formOptionsLabes?.requestType[realestate.requestType]
    }\n<b>Тип об\`єкту</b>: ${
      formOptionsLabes?.typeRealEstateObject[realestate.typeRealEstateObject]
    }\n<b>Статус</b>: ${
      formOptionsLabes?.status[realestate.status]
    }\n\n<b>Mедіа ресурс</b>: ${realestate.mediaSource}\n\n${
      realestate.comments
    }`;

    await bot.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });

    bot = null;
  }

  async printAllObjects(userID) {
    return false;
    console.log(userID);

    if (!userID) return;

    const realtor = await RealtorsService.getSingle(userID);
    console.log(realtor);
    if (!realtor?._id) return;

    const objects = await RealestateService.getAll({ realtor: realtor?._id });

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    console.log(objects);
    if (!objects?.length) {
      await bot.sendMessage(
        realtor.userId,
        `Вам поки не призначено жодного об'єкта!`,
        {
          parse_mode: "HTML",
        }
      );
    } else {
      Promise.all(
        objects.map(async (realestate) => {
          const message = `${realestate.clientName} (${
            realestate.clientPhone
          }) <b>${formOptionsLabes?.status[realestate.status]}</b>\n\n${
            realestate.location
          }`;

          await bot.sendMessage(realtor?.userId, message, {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Дивитись повну інформацію",
                    callback_data: `objectMethods_printInfo-${realestate?._id}`,
                  },
                ],
              ],
              one_time_keyboard: true,
            },
          });
        })
      ).then(() => {
        return console.log("Success!");
      });
    }
  }
}

module.exports = new ObjectCommands();
