const { sendMessage } = require("./handler");

const handleError = (chatId, methodName, err) => {
  console.error(
    `Error occurred :-\nMethod Name: ${methodName}\nError Message: ${err.message}\nError Object: ${err}`
  );
  const errorMessage = "Oops! Something went wrong. Please try again later.";

  // Send a generic error message to the user
  sendMessage(chatId, errorMessage);
};

module.exports = { handleError };
