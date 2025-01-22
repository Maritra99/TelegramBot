const bot = require("./botConfig");
const commandHandler = require("../Handlers/commandHandler");
const messageHandler = require("../Handlers/messageHandler");
const extractDetails = require("../Utils/extractDetails");
const memberShipHelper = require("../Utils/memberShipHelper");
const botHelper = require("./botHelper");
const catchAsyncError = require("../Error/catchAsyncError");
const callbackHandlers = require("../Handlers/callbackhandlers");

const allowedGroups = [process.env.ERROR_GROUP, process.env.MESSAGE_GROUP];

bot.on(
  "text",
  catchAsyncError(async (msg) => {
    const message = extractDetails.getMessage(msg);
    const chatId = extractDetails.getChatId(msg);
    const chatType = extractDetails.getChatType(msg);
    const groupName = extractDetails.getGroupName(msg);

    if (chatType === "group" || chatType === "supergroup") {
      if (!allowedGroups.includes(groupName)) {
        return;
      }
    } else if (chatType === "private") {
      const isMember = await memberShipHelper.checkMemberShip(chatId);

      if (!isMember) {
        return memberShipHelper.handleWithoutMemberShip(chatId);
      }

      if (message.startsWith("/")) {
        commandHandler(chatId, message);
      } else {
        messageHandler(chatId, message);
      }
    }
  })
);

bot.on(
  "callback_query",
  catchAsyncError(async (callbackQuery) => {
    const { message: messageObj, data, from } = callbackQuery;
    const chatId = extractDetails.getChatId(messageObj);
    const messageIdToDeletePreviousCallback =
      extractDetails.getMessageId(messageObj);
    const chatType = extractDetails.getChatType(messageObj);
    const groupName = extractDetails.getGroupName(messageObj);

    // Check if callback is coming from a group, group should be Admin's group
    if (chatType === "group" || chatType === "supergroup") {
      if (!allowedGroups.includes(groupName)) {
        return;
      }

      // Callbacks for admin should always starts with admin_ and ends with _chatIdOfUser
      if (data.startsWith("admin_")) {
        const parts = data.split("_");
        const callback = parts.slice(0, -1).join("_");
        const userWhoMadeThePayment = parts[parts.length - 1];

        await callbackHandlers.adminHandler(
          chatId,
          messageIdToDeletePreviousCallback,
          callback,
          userWhoMadeThePayment
        );
      }
      // If callback is coming from private chat process normally
    } else if (chatType === "private") {
      const isMember = await memberShipHelper.checkMemberShip(chatId);

      if (!isMember) {
        return memberShipHelper.handleWithoutMemberShip(chatId);
      }

      if (callbackHandlers.callbacks[data]) {
        await callbackHandlers.handler(
          chatId,
          messageIdToDeletePreviousCallback,
          data,
          from
        );
      } else {
        await botHelper.sendMessageToUser(
          chatId,
          "Oops! I didn't recognize that action. Please try again. 🤔"
        );
      }

      await botHelper.answerCallbackQuery(callbackQuery.id);
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
  }
});

bot.on("polling_error", (error) => {
  console.error(`Polling Error Occured: ${JSON.stringify(error)}`);
});

bot.on("error", (error) => {
  console.error(`Normal Error Occured: ${JSON.stringify(error)}`);
});
