const mongoose = require("mongoose");
const chirps = require("./src/chirps.json");
const ChirpModel = require("./src/models/ChirpModel");

const { MongoMemoryServer } = require("mongodb-memory-server");

let instance;

beforeAll(async () => {
  instance = await MongoMemoryServer.create();
  await mongoose.connect(instance.getUri());

  // mongoose does not support the "$oid" syntax in the JSON
  // so replace it with a mongoose ObjectId
  const chirpsWithObjectId = chirps.map((chirp) => {
    return {
      ...chirp,
      _id: new mongoose.Types.ObjectId(chirp._id.$oid),
      createdDate: chirp.createdDate.$date,
    };
  });

  await ChirpModel.collection.insertMany(chirpsWithObjectId);
});

afterAll(async () => {
  await mongoose.disconnect();
  await instance.stop();
});
