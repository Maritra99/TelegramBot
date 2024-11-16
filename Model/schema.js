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

schema.transaction = mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
    },
    plan: {
      type: String,
    },
    amount: {
      type: Number,
    },
    userPaymentState: {
      type: String,
    },
    adminPaymentState: {
      type: String,
    },
  },
  { timestamps: true, collection: "transaction" }
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
