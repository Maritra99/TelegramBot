const model = require("./schema");

exports.updateTransaction = async (chatId, rest) => {
  return model.transactionModel
    .findOneAndUpdate({ chatId }, { ...rest }, { upsert: true, new: true })
    .lean()
    .exec();
};
