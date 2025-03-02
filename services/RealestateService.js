const Object = require("../models/Object");
const User = require("../models/User");
const Notificatoins = require("./Notificatoins");

class RealestateService {
  async create(options) {
    // if (!options?.userId || !options?.username) {
    //   throw new Error("Invalid data sent");
    // }

    const newObject = await Object.create(options);

    if (newObject?._id) {
      Notificatoins.createdNewObject({
        userId: newObject?.realtor,
        objectID: newObject?._id,
      });
    }

    return newObject;
  }

  async getAll() {
    const objects = await Object.find().populate("realtor");
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

    const object = await Object.findByIdAndUpdate(id, options, {
      new: true,
    });

    return object;
  }
}
