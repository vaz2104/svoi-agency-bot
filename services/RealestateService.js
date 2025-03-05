const Object = require("../models/Object");
const User = require("../models/User");
const Notificatoins = require("./Notificatoins");

class RealestateService {
  async create(options) {
    const newObject = await Object.create(options);

    if (newObject?._id) {
      Notificatoins.createdNewObject({
        userId: newObject?.realtor,
        objectID: newObject?._id,
      });
    }

    return newObject;
  }

  async getAll(options) {
    const objects = await Object.find(options).populate("realtor");

    return objects;

    // const relations = [];
    // Promise.all(
    //   exportedObjects.map(async (object) => {
    //     const options = { ...object };
    //     delete options.Order;
    //     delete options.realtor;
    //     options.comments = object.comments + " " + object.realtor;

    //     // console.log(options);

    //     const newObject = await Object.create(options);
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

    const object = await Object.findByIdAndDelete(id);

    // console.log(object);

    // await Notificatoins.deletedObject(id)

    return object;
  }
  async getSingle(id) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    const object = await Object.findById(id).populate("realtor");

    return object;
  }
  async update(id, options) {
    if (!id) {
      throw new Error("Invalid data sent");
    }

    if (options?.realtor === "") {
      options.realtor = null;
    }

    const object = await Object.findByIdAndUpdate(id, options, {
      new: true,
    });

    // if (object?._id && options?.realtor) {
    //   Notificatoins.createdNewObject({
    //     userId: object?.realtor,
    //     objectID: object?._id,
    //   });
    // }

    return object;
  }
}

module.exports = new RealestateService();
