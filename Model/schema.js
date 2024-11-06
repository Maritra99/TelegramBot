const mongoose = require("mongoose");

const schema = {};

schema.user = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true, collection: "users" }
);

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
  { timestamps: true, collection: "userState" }
);

const model = {};

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
