const mongoose = require("mongoose");

const schema = {};
const model = {};

const PaymentStatus = (model.PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
});

schema.UserState = mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
    },
    state: {
      type: Array,
    },
  },
  { timestamps: true, collection: "userStates" }
);

const Transaction = mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
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
  {
    _id: false,
  }
);

schema.Transactions = mongoose.Schema(
  {
    chatId: {
      type: String,
      unique: true,
    },
    transactions: {
      type: [Transaction],
    },
  },
  { timestamps: true, collection: "transactions" }
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
