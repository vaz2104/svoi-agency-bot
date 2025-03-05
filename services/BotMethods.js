const ObjectCommands = require("./ObjectCommands");

function objectMethodsSwitch(commandData) {
  const dataParts = commandData.split("-");

  switch (dataParts[0]) {
    case "printInfo":
      ObjectCommands.printInfo(dataParts[1]);
      break;

    case "printAllObjects":
      ObjectCommands.printAllObjects(dataParts[1]);
      break;
  }
}

class BotMethods {
  async callbackListener(bot) {
    bot.on("callback_query", async (callbackData) => {
      const { data } = callbackData;
      const userObject = callbackData.from;

      console.log(data);

      const dataParts = data.split("_");
      console.log(`callback_query => ${dataParts}`);

      switch (dataParts[0]) {
        case "objectMethods":
          objectMethodsSwitch(dataParts[1]);
          break;
      }
    });
  }
}

module.exports = new BotMethods();
