const botHelper = require("../Bot/botHelper");
const catchAsyncError = require("../Error/catchAsyncError");
const keyboard = require("../Static/Keyboard");

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
    "Join Channel",
    keyboard.JOIN_CHANNEL_KEYBOARD
  );
});

module.exports = memberShipHelper;
