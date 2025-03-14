const AuthService = require("./AuthService");
const UserService = require("./UserService");

class ExternalCommands {
  async getAuthData(bot, options) {
    if (!options.telegramUserId) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка запиту!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    const user = await UserService.getUser(options.telegramUserId);

    if (!user?._id) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    if (!user?.isActivated) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nВаш профіль ще не активований адміністратором`
      );
      return false;
    }

    if (user?.role !== "admin") {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nДоступ до панелі має лише адміністратор`
      );
      return false;
    }

    const newAuthData = await AuthService.createKey(user?._id);

    if (!newAuthData?._id) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    const message = `Ваші дані для входу:\n\n<b>Логін:</b>${user.username}\n<b>Пароль:</b>${newAuthData.key}\n\n<b>Важливо!</b> Вхід за даним паролем доступний лише один раз!`;
    await bot.sendMessage(options.chatUserId, message, {
      parse_mode: "HTML",
    });
  }
}

module.exports = new ExternalCommands();
