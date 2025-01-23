const model = require("./schema");

exports.updateAmountInTransaction = async (chatId, amount) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId, "transactions.userPaymentState": "PENDING" },
    { $set: { "transactions.$.amount": amount } },
    { new: true }
  );
};

exports.updatePaymentTimeAndStatus = async (
  chatId,
  transactionId,
  transactionTime,
  transactionStatus
) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId, "transactions.transactionId": transactionId },
    {
      $set: {
        "transactions.$.transactionTime": transactionTime,
        "transactions.$.userPaymentState": transactionStatus,
      },
    },
    { new: true }
  );
};

exports.deleteTransaction = async (chatId, transactionId) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId: chatId.toString() },
    {
      $pull: {
        transactions: { transactionId: transactionId },
      },
    },
    { new: true }
  )
    .lean()
    .exec();
};

exports.saveTransaction = async (chatId, newTransaction) => {
  return model.TransactionsModel.bulkWrite([
    {
      updateOne: {
        filter: { chatId },
        update: {
          $pull: {
            transactions: { userPaymentState: model.PaymentStatus.PENDING },
          },
        },
      },
    },
    {
      updateOne: {
        filter: { chatId },
        update: { $push: { transactions: newTransaction } },
        upsert: true,
      },
    },
  ]);
};

exports.fetchTransaction = async (chatId, transactionId) => {
  return model.TransactionsModel.aggregate([
    {
      $match: {
        chatId: chatId.toString(),
      },
    },
    { $unwind: "$transactions" },
    {
      $match: {
        "transactions.transactionId": transactionId.toString(),
      },
    },
    {
      $addFields: {
        planName: "$transactions.plan.name",
        amount: "$transactions.amount",
        transactionId: "$transactions.transactionId",
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
        transactions: 0,
      },
    },
  ]).exec();
};

exports.updatePaymentStatusForAdmin = async (
  userChatId,
  transactionId,
  transactionStatus
) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId: userChatId, "transactions.transactionId": transactionId },
    {
      $set: {
        "transactions.$.adminPaymentState": transactionStatus,
      },
    },
    { new: true }
  );
};
