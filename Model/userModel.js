const model = require("./schema");

exports.saveMemberDataToDB = async (userId, name) => {
  try {
    const existingUser = await model.userModel.findOne({ userId });
    if (!existingUser) {
      const userData = {
        userId,
        name,
      };
      const newUserData = model.userModel(userData);
      await newUserData.save();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.saveUserState = async (chatId, state) => {
  try {
    return await model.userStateModel
      .findOneAndUpdate({ chatId }, { state }, { upsert: true, new: true })
      .lean()
      .exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findUserStateByChatID = async (chatId) => {
  try {
    return await model.userStateModel.findOne({ chatId }).lean().exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeUserStateByChatID = async (chatId) => {
  try {
    return await model.userStateModel.deleteOne({ chatId });
  } catch (error) {
    throw new Error(error.message);
  }
};
