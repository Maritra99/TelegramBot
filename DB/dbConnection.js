const mongoose = require("mongoose");
const model = require("../schema");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    model.createModel();
  } catch (error) {
    console.log("Error in Database Connection :", error);
    process.exit(1);
  }
};
