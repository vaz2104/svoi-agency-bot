const User = require("../models/User");

class RealtorsService {
  async getAll() {
    return await User.find();
  }
  async getSingle(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    return await User.findById(id);
  }
  async updateProfile(id, options) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    return await User.findByIdAndUpdate(id, options, {
      new: true,
    });
  }
}

module.exports = new RealtorsService();
