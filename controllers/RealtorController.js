const RealtorsService = require("../services/RealtorsService");

class RealtorController {
  async getAll(req, res) {
    try {
      const data = await RealtorsService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getSingle(req, res) {
    try {
      const data = await RealtorsService.getSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async updateProfile(req, res) {
    try {
      const data = await RealtorsService.updateProfile(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new RealtorController();
