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
    plan: {
      type: String,
    },
  },
  { timestamps: true, collection: "userState" }
);

schema.transaction = mongoose.Schema({
  chatId: {
    type: String,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userPaymentState: {
    type: String,
    required: true,
  },
  adminPaymentState: {
    type: String,
    required: true,
  },
});

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
