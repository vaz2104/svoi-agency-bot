const AuthService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const data = await AuthService.login(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();
