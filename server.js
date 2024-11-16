require("dotenv").config();
const { connectDB } = require("./DB/dbConnection.js");
connectDB();

require("./Bot/botController");

const app = require("express")();

const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
  try {
    res.send("Bot is Up and Running");
  } catch (error) {
    res.status(500).send("Something is Fissy!!!!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
