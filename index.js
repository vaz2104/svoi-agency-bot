require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserService = require("./services/UserService");
const ExternalCommands = require("./services/ExternalCommands");

const authRouts = require("./routs/authRouts");
const realestateRouts = require("./routs/realestateRouts");
const realtorsRouts = require("./routs/realtorsRouts");
const ObjectCommands = require("./services/ObjectCommands");
const BotMethods = require("./services/BotMethods");

const app = express();

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DB connected`);
  } catch (error) {
    console.log(`Error whyle init project ${error}`);
  }
}

init();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

bot.onText(/\/start/, async function (msg) {
  const { id: userId, username, first_name: firstName } = msg.from;
  const dataParts = msg.text.split(" ");

  let telegramUser = await UserService.getUserByTelegramId(userId);

  if (!telegramUser?._id) {
    const newUserOptions = {
      username: username || userId,
      userId,
      firstName,
    };

    const avatars = await bot.getUserProfilePhotos(userId);

    if (avatars?.photos[0]) {
      newUserOptions.photoUrl = await bot.getFileLink(
        avatars?.photos[0][0]?.file_id
      );
    }

    await UserService.createUser(newUserOptions);
  }

  if (dataParts.length > 1 && telegramUser?._id) {
    checkCommand(dataParts[1], bot, {
      telegramUserId: telegramUser?._id,
      chatUserId: userId,
    });
    return;
  }

  await bot.sendMessage(
    userId,
    telegramUser?._id
      ? `Привіт ${username ? `@${username}` : firstName}!\nРаді знову бачити!`
      : `Привіт ${
          username ? `@${username}` : firstName
        }!\nВітаємо в <b>SVOI Agency BOT</b>\nОчікуйте підтвердження доступу від адміністратора`,
    {
      parse_mode: "HTML",
    }
  );
});

BotMethods.callbackListener(bot);

/*********************************************
 *     Commands
 **********************************************/
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.APP_URL || "*"}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to a SVOI Agency" });
});

app.use("/api", authRouts);
app.use("/api", realtorsRouts);
app.use("/api", realestateRouts);

app.listen(process.env.PORT, () => {
  console.log(`Bot started and listening on port ${process.env.PORT}`);
});

function checkCommand(command, bot, options) {
  const commandParts = command.split("_");
  const commandName = commandParts[0];
  const commandData = commandParts[1];

  switch (commandName) {
    case "getAuthData":
      ExternalCommands.getAuthData(bot, options);
      break;
  }
}
