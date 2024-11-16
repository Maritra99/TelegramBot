const mongoose = require("mongoose");
const model = require("../Model/schema.js");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    model.createModel();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error in Database Connection :", JSON.stringify(error));
    process.exit(1);
  }
};
