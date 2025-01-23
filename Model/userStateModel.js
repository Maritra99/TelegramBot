const model = require("./schema");

const userStateModel = {};

userStateModel.saveUserState = async (chatId, state) => {
  return model.UserStateModel
    .findOneAndUpdate(
      { chatId },
      { $push: { state: state } },
      { upsert: true, new: true }
    )
    .lean()
    .exec();
};

userStateModel.findUserStateByChatID = async (chatId) => {
  return model.UserStateModel.findOne({ chatId }).lean().exec();
};

module.exports = userStateModel;
