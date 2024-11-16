const model = require("./schema")

const userStateModel = {};

userStateModel.saveUserState = async (chatId, state) => {
  return await model.userStateModel
    .findOneAndUpdate({ chatId }, { state }, { upsert: true, new: true })
    .lean()
    .exec();
};

module.exports = userStateModel;
