const NotificationUserRelation = require("../models/NotificationUserRelation");

class NotificationService {
  async getAll(id) {
    const objects = await NotificationUserRelation.find({
      recipient: id,
    })
      .sort([["timestamp", -1]])
      .populate(["notification"])
      .populate({
        path: "notification",
        populate: [
          {
            path: "author",
            model: "User",
          },
          {
            path: "realEstate",
            model: "RealEstate",
          },
        ],
      });

    await NotificationUserRelation.updateMany(
      {
        recipient: id,
        isOpened: false,
      },
      { isOpened: true }
    );

    return objects;
  }
}

module.exports = new NotificationService();
