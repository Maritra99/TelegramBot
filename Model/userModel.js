const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");
const model = require("./schema");

const userModel = {};

userModel.saveUserIfNotPresent = async (chatId, name, referedBy) => {
  chatId = String(chatId);

  const existing = await model.UserModel.findOne({ chatId }).lean().exec();

  if (!existing) {
    notifyErrorToAdmin(`${chatId} has Joined our team`);

    return model.UserModel.findOneAndUpdate(
      { chatId },
      { chatId, name, referedBy },
      { upsert: true, new: true }
    )
      .lean()
      .exec();
  } else {
    return existing;
  }
};

userModel.findByChatID = async (chatId) => {
  return model.UserModel.findOne({ chatId }).lean().exec();
};

module.exports = userModel;
