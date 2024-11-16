const botHelper = require("../Bot/botHelper");
const userStateModel = require("../Model/userStateModel");
const keyBoard = require("../Static/Keyboard");
const message = require("../Static/message");
const userState = require("../Static/userState");

module.exports = async (chatId) => {
  const startText = message.START_MESSAGE;

  await userStateModel.saveUserState(chatId, userState["STARTING_BOT"]);

  return await botHelper.sendKeyboardToUser(
    chatId,
    startText,
    keyBoard.START_MESSAGE_KEYBOARD
  );
};
