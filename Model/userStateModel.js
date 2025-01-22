const model = require("./schema");

const userStateModel = {};

userStateModel.saveUserState = async (chatId, state) => {
  return model.userStateModel
    .findOneAndUpdate(
      { chatId },
      { $push: { state: state } },
      { upsert: true, new: true }
    )
    .lean()
    .exec();
};

userStateModel.findUserStateByChatID = async (chatId) => {
  return model.userStateModel.findOne({ chatId }).lean().exec();
};

module.exports = userStateModel;
