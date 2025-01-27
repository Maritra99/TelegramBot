const botHelper = require("../Bot/botHelper");
const catchAsyncError = require("../Error/catchAsyncError");
const keyboard = require("../Static/Keyboard");
const message = require("../Static/message");
const renderMessage = require("../Utils/renderMessage");

const memberShipHelper = {};

memberShipHelper.checkMemberShip = catchAsyncError(async (userId) => {
  const channelUsername = process.env.CHANNEL_USERNAME;

  const chatMember = await botHelper.isUserAlreadyMember(
    channelUsername,
    userId
  );

  return chatMember
    ? ["member", "administrator", "creator"].includes(chatMember.status)
    : false;
});

memberShipHelper.handleWithoutMemberShip = catchAsyncError(async (chatId) => {
  return await botHelper.sendKeyboardToUser(
    chatId,
    renderMessage(message.JOIN_CHANNEL, {
      channelName: process.env.CHANNEL_NAME,
    }),
    keyboard.JOIN_CHANNEL_KEYBOARD
  );
});

module.exports = memberShipHelper;
