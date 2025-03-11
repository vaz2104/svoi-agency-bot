const Notification = require("../models/Notification");
const NotificationUserRelation = require("../models/NotificationUserRelation");
const RealEstate = require("../models/RealEstate");
const User = require("../models/User");
const Notificatoins = require("./Notificatoins");

class RealestateService {
  async create(options) {
    const newObject = await RealEstate.create(options);
    const author = await User.findById(options?.author);

    if (newObject?._id && options?.author !== options?.realtor) {
      Notificatoins.createdNewObject({
        userId: newObject?.realtor,
        objectID: newObject?._id,
      });
    }

    if (author?.role === "realtor") {
      Notificatoins.createdNewObjectByRealtor({
        objectID: newObject?._id,
        author,
      });
    }

    return newObject;
  }

  async getAll(options) {
    const search =
      options?.realtor || options?.status || options?.author ? options : {};
    const objects = await RealEstate.find(search)
      .sort([["timestamp", -1]])
      .populate("realtor");

    return objects;

    // const relations = [];
    // Promise.all(
    //   exportedObjects.map(async (object) => {
    //     const options = { ...object };
    //     delete options.Order;
    //     delete options.realtor;
    //     options.comments = object.comments + " " + object.realtor;

    //     // console.log(options);

    //     const newObject = await RealEstate.create(options);
    //     relations.push(newObject);
    //   })
    // ).then(() => {
    //   return relations;
    // });

    // return relations;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    const object = await RealEstate.findByIdAndDelete(id);

    const allNotifications = await Notification.find({
      realEstate: object?._id,
    });

    allNotifications.map(async (notification) => {
      await Notification.findByIdAndDelete(notification?._id);
      await NotificationUserRelation.deleteOne({
        notification: notification?._id,
      });
    });

    return object;
  }
  async getSingle(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    const object = await RealEstate.findById(id).populate("realtor");

    return object;
  }
  async update(id, options) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    if (options?.realtor === "") {
      options.realtor = null;
    }

    let author = null;
    if (options?.author) {
      author = options.author;
      delete options.author;
    }
    const oldObjectVersion = await RealEstate.findById(id);

    const newObjectVersion = await RealEstate.findByIdAndUpdate(id, options, {
      new: true,
    });

    if (newObjectVersion?._id && options?.realtor) {
      await Notificatoins.createdNewObject({
        userId: newObjectVersion?.realtor,
        objectID: newObjectVersion?._id,
      });
    }

    if (author) {
      await Notificatoins.updatedObject({
        author,
        oldObjectVersion,
        newObjectVersion,
        updatedFields: options,
      });
    }

    return newObjectVersion;
  }
}

module.exports = new RealestateService();
