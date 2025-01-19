const model = require("./schema");

exports.updateTransaction = async (chatId, rest) => {
  return model.transactionModel
    .findOneAndUpdate({ chatId }, { ...rest }, { upsert: true, new: true })
    .lean()
    .exec();
};

exports.deleteTransactionByChatId = async (chatId) => {
  return model.transactionModel.deleteOne({ chatId }).lean().exec();
};

exports.fetchTransactionByChatId = async (chatId) => {
  return model.transactionModel.findOne({ chatId }).lean().exec();
};
