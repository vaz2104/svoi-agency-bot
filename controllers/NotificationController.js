const NotificationService = require("../services/NotificationService");

class NotificationController {
  async getAll(req, res) {
    try {
      const data = await NotificationService.getAll(req?.query?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new NotificationController();
