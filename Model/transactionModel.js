const model = require("../schema");

exports.updateTransaction = async (chatId, rest) => {
  try {
    return await model.transactionModel.findOneAndUpdate(
      {
        chatId,
      },
      { ...rest },
      { upsert: true, new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.fetchTransactionByChatId = async (chatId) => {
  try {
    return await model.transactionModel.findOne({
      chatId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeTransactionByChatId = async (chatId) => {
  try {
    return await model.transactionModel.deleteOne({
      chatId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
