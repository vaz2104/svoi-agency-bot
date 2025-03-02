const RealestateService = require("../services/RealestateService");

class RealestateController {
  async create(req, res) {
    try {
      const data = await RealestateService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const data = await RealestateService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const data = await RealestateService.delete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getSingle(req, res) {
    try {
      const data = await RealestateService.getSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new RealestateController();
