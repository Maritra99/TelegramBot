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

bot.on(
  "text",
  catchAsyncError(async (msg) => {
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

      const args = {
        userChatId: chatId,
        messageText,
      };

      if (messageText.startsWith("/")) {
        commandHandler(args);
      } else {
        messageHandler(args);
      }
    }
  })
);

bot.on(
  "callback_query",
  catchAsyncError(async (callbackQuery) => {
    const {
      message: msg,
      data: callbackData,
      from: userDetails,
    } = callbackQuery;

    // acknowledge the query early to avoid timeOuts
    await botHelper.answerCallbackQuery(callbackQuery.id);

    // Extract necessary Details
    const messageId = extractDetails.getMessageId(msg);
    const chatType = extractDetails.getChatType(msg);
    const groupName = extractDetails.getGroupName(msg);

    // Create argument Object to pass to further method
    const args = {
      messageId,
      userDetails,
    };

    // Check if callback is coming from a group, group should be Admin's group
    if (chatType === "group" || chatType === "supergroup") {
      if (!allowedGroups.includes(groupName)) {
        return;
      }

      // Callbacks for admin should always starts with admin_ and ends with _chatIdOfUser
      if (callbackData.startsWith("admin_")) {
        const chatId = extractDetails.getChatId(msg);

        const { endDigit: userChatId, startCallback: callbackDataForAdmin } =
          extractChatIdAndCallbackData(callbackData);

        // Create Argument Object for Admin
        const adminArgs = {
          ...args,
          adminChatId: chatId,
          callbackDataForAdmin,
          userChatId,
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
  })
);

bot.on("my_chat_member", (msg) => {
  const chat = msg.chat;

  if (chat.type === "group" || chat.type === "supergroup") {
    console.log(`Bot added to group: ${chat.title}`);
    console.log(
      `Group username: ${chat.username || "No username (private group)"}`
    );
    notifyErrorToAdmin(`Normal Error Occured: ${JSON.stringify(error)}`);
  }
});

bot.on("polling_error", (error) => {
  console.error(`Polling Error Occured: ${JSON.stringify(error)}`);
});

bot.on("error", (error) => {
  console.error(`Normal Error Occured: ${JSON.stringify(error)}`);
  notifyErrorToAdmin(`Normal Error Occured: ${JSON.stringify(error)}`);
});
