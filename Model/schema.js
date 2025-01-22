const mongoose = require("mongoose");

const schema = {};
const model = {};

const PaymentStatus = (model.PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
});

schema.userState = mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
    },
    state: {
      type: Array,
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
      name: { type: String },
      interest: { type: String },
      duration: { type: String },
    },
    amount: {
      type: Number,
    },
    userPaymentState: {
      type: String,
      enum: PaymentStatus,
    },
    adminPaymentState: {
      type: String,
      enum: PaymentStatus,
    },
    transactionTime: {
      type: Date,
    },
  },
  { timestamps: true, collection: "transaction" }
);

model.createModel = async () => {
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
