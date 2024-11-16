const mongoose = require("mongoose");

const schema = {};
const model = {};

schema.userState = mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true, collection: "userState" }
);

model.createModel = () => {
  for (let collectionName in schema) {
    if (schema.hasOwnProperty(collectionName)) {
      model[`${collectionName}Model`] = mongoose.model(
        collectionName,
        schema[collectionName]
      );
    }
  }
};

module.exports = model;
