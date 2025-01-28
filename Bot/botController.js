const bot = require("./botConfig");
const commandHandler = require("../Handlers/commandHandler");
const messageHandler = require("../Handlers/messageHandler");
const extractDetails = require("../Utils/extractDetails");
const memberShipHelper = require("../Utils/memberShipHelper");
const botHelper = require("./botHelper");
const catchAsyncError = require("../Error/catchAsyncError");
const callbackHandlers = require("../Handlers/callbackhandlers");
const extractChatIdAndCallbackData = require("../Utils/extractChatIdAndCallbackData");
const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");

const allowedGroups = [process.env.ERROR_GROUP, process.env.MESSAGE_GROUP];

const handleTextMessage = async (msg) => {
  const messageText = extractDetails.getMessage(msg);
  const chatType = extractDetails.getChatType(msg);
  const groupName = extractDetails.getGroupName(msg);

  if (chatType === "group" || chatType === "supergroup") {
    if (!allowedGroups.includes(groupName)) {
      return;
    }
  } else if (chatType === "private") {
    const chatId = extractDetails.getChatId(msg);

    const isMember = await memberShipHelper.checkMemberShip(chatId);

    if (!isMember) {
      return memberShipHelper.handleWithoutMemberShip(chatId);
    }

    const args = { userChatId: chatId, messageText };
    if (messageText.startsWith("/")) {
      commandHandler(args);
    } else {
      messageHandler(args);
    }
  }
};

const handleCallbackQuery = async (callbackQuery) => {
  const { message: msg, data: callbackData, from: userDetails } = callbackQuery;

  // Acknowledge the query early to avoid timeOuts
  await botHelper.answerCallbackQuery(callbackQuery.id);

  // Extract necessary Details
  const messageId = extractDetails.getMessageId(msg);
  const chatType = extractDetails.getChatType(msg);
  const groupName = extractDetails.getGroupName(msg);

  // Create argument Object to pass to further method
  const args = { messageId, userDetails };

  // Check if callback is coming from a group, group should be Admin's group
  if (chatType === "group" || chatType === "supergroup") {
    if (!allowedGroups.includes(groupName)) {
      return;
    }

    const {
      endDigit: paymentId,
      midDigit: userChatId,
      startCallback: callbackDataForAdmin,
    } = extractChatIdAndCallbackData(callbackData);

    // Callbacks for admin should always starts with admin_ and ends with _chatIdOfUser
    if (callbackHandlers.AdminCallbacks[callbackDataForAdmin]) {
      const chatId = extractDetails.getChatId(msg);

      // Create Argument Object for Admin
      const adminArgs = {
        ...args,
        adminChatId: chatId,
        callbackDataForAdmin,
        userChatId,
        paymentId,
      };

      await callbackHandlers.adminHandler(adminArgs);
    }
    // If callback is coming from private chat process normally
  } else if (chatType === "private") {
    const chatId = extractDetails.getChatId(msg);

    const isMember = await memberShipHelper.checkMemberShip(chatId);

    if (!isMember) {
      return memberShipHelper.handleWithoutMemberShip(chatId);
    }

    const { startCallback: callbackDataForUser, endDigit: paymentId } =
      extractChatIdAndCallbackData(callbackData);

    const userArgs = {
      ...args,
      callbackDataForUser,
      userChatId: chatId,
      paymentId,
    };

    if (callbackHandlers.callbacks[callbackDataForUser]) {
      await callbackHandlers.handler(userArgs);
    } else {
      await botHelper.sendMessageToUser(
        chatId,
        "Oops! I didn't recognize that action. Please try again. 🤔"
      );
    }
  }
};

const handleMyChatMember = (msg) => {
  const chat = msg.chat;

  if (chat.type === "group" || chat.type === "supergroup") {
    const groupMessage = `Bot added to group: ${chat.title}\nGroup username: ${
      chat.username || "No username (private group)"
    }`;

    notifyErrorToAdmin(groupMessage);
  }
};

const handlePollingError = (error) => {
  notifyErrorToAdmin(`Polling Error Occurred: ${JSON.stringify(error)}`);
};

const handleError = (error) => {
  console.error(`Normal Error Occurred: ${JSON.stringify(error)}`);
  notifyErrorToAdmin(`Normal Error Occurred: ${JSON.stringify(error)}`);
};

// Event listeners
bot.on("text", catchAsyncError(handleTextMessage));
bot.on("callback_query", catchAsyncError(handleCallbackQuery));
bot.on("my_chat_member", handleMyChatMember);
bot.on("polling_error", handlePollingError);
bot.on("error", handleError);
