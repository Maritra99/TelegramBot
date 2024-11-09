const errorHandler = require("./globalErrorHandler");

module.exports = (fn) => {
  return async (chatId, message) => {
    try {
      return await fn(chatId, message);
    } catch (error) {
      errorHandler(error, chatId, message);
    }
  };
};
