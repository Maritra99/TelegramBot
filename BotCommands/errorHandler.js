const { sendInlineKeyboard } = require("./handler");
const message = require("../Static/message");
const keyboard = require("../Static/keyBoard");

exports.handleError = (chatId, methodName, err, messageTosend) => {
  console.error(
    `Error occurred :-\nMethod Name: ${methodName}\nError Message: ${err.message}\nError Object: ${err}`
  );
  const errorMessage = messageTosend || message.GENERIC_ERROR_MESSAGE;
  const restartKeyboard = keyboard.RESTART_KEYBOARD;
  // Send a generic error message to the user
  sendInlineKeyboard(chatId, errorMessage, restartKeyboard);
};
