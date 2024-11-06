const { sendMessage } = require("./handler");
const message = require("../Static/message");

exports.handleError = (chatId, methodName, err) => {
  console.error(
    `Error occurred :-\nMethod Name: ${methodName}\nError Message: ${err.message}\nError Object: ${err}`
  );
  const errorMessage = message.GENERIC_ERROR_MESSAGE;
  // Send a generic error message to the user
  sendMessage(chatId, errorMessage);
};
