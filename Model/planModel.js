const model = require("./schema");

exports.fetchPlanByPlanName = async (planName) => {
  try {
    return await model.planModel.findOne({
      planName,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
