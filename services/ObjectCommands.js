const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("../lib/formatDate");
const formOptionsLabes = require("../lib/formOptionsLabes");
const RealestateService = require("./RealestateService");
const RealtorsService = require("./RealtorsService");

class ObjectCommands {
  async printInfo(objectID) {
    if (!objectID) return;

    let bot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: false,
    });

    if (!bot) return null;

    const realestate = await RealestateService.getSingle(objectID);

    if (!realestate?._id) return;

    const realtor = await RealtorsService.getSingle(realestate.realtor?._id);

    const message = `<b>Клієнт</b>: ${realestate.clientName} (${
      realestate.clientPhone || " - "
    })\n<b>Деталі про об\`єкт</b>: ${
      realestate.objectDescription || " - "
    }\n<b>Локація (адреса об\`єкта)</b>: ${
      realestate.location
    }\n<b>Бюджет</b>: ${
      realestate.budget || " - "
    }\n<b>Дата реєстрації об\`єкта</b>: ${formatDate(
      realestate.dateRegistration
    )}\n<b>Тип операції</b>: ${
      formOptionsLabes?.requestType[realestate.requestType]
    }\n<b>Тип об\`єкту</b>: ${
      formOptionsLabes?.typeRealEstateObject[realestate.typeRealEstateObject]
    }\n<b>Статус</b>: ${
      formOptionsLabes?.status[realestate.status]
    }\n\n<b>Mедіа ресурс</b>: ${realestate.mediaSource}\n\n${
      realestate.comments
    }`;

    // return;
    await bot.sendMessage(realtor.userId, message, {
      parse_mode: "HTML",
    });
  }
}

module.exports = new ObjectCommands();
