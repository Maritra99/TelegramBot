const model = require("../schema");

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
