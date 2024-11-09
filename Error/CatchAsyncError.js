const errorHandler = require("../Error/GlobalErrorHandler");

const CatchAsyncError = (fn) => {
  return (chatId, message) => {
    try {
      fn(chatId, message);
    } catch (error) {
      errorHandler(error, chatId, message);
    }
  };
};

module.exports = CatchAsyncError;
