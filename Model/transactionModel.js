const model = require("./schema");

exports.updateAmountInTransaction = async (chatId, amount) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId, "transactions.userPaymentState": "PENDING" },
    { $set: { "transactions.$.amount": amount } },
    { new: true }
  );
};

exports.deleteTransactionByTxnId = async (chatId) => {
  return model.TransactionsModel.findOneAndUpdate(
    { chatId },
    {
      $pull: { "transaction.$.userPaymentState": model.PaymentStatus.PENDING },
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

exports.fetchTransactionByChatId = async (chatId) => {
  return model.TransactionsModel.findOne({ chatId }).lean().exec();
};
