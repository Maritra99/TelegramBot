const model = require("../Model/userModel");
const keyboard = require("../Static/keyBoard");
const JSONMessage = require("../Static/message");
const renderMessage = require("../Static/renderMessage");
const bot = require("./createBot");
const errorHandler = require("./errorHandler");

exports.sendMessage = (chatId, messageText, inlineKeyboard) => {
  bot.sendMessage(chatId, messageText, {
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard?.reply_markup || undefined,
  });
};

exports.sendInlineKeyboard = (chatId, messageText, buttons) => {
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: buttons,
    },
  };
  this.sendMessage(chatId, messageText, inlineKeyboard);
};

exports.getMessageDetails = (msg) => {
  const {
    chat: { id: chatId, first_name, last_name },
    text: messageText,
  } = msg;
  return { chatId, messageText, name: first_name + " " + last_name };
};

exports.checkMembership = async (userId) => {
  try {
    const chatMember = await bot.getChatMember(
      process.env.CHANNEL_USERNAME,
      userId
    );
    return ["member", "administrator", "creator"].includes(chatMember.status);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

exports.handleStartMessage = (chatId) => {
  return this.sendInlineKeyboard(
    chatId,
    renderMessage(JSONMessage.START_MESSAGE, { amount: 12 }),
    keyboard.START_MESSAGE_KEYBOARD
  );
};

exports.handleCommands = (command, chatId) => {
  switch (command) {
    case "start":
      this.handleStartMessage(chatId);
      break;

    default:
      this.sendMessage(chatId, "Unknown Command For Me");
      break;
  }
};

exports.handleMessage = async (chatId, messageText) => {
  try {
    const userState = await model.findUserStateByChatID(chatId);

    if (!userState) {
      return this.sendMessage(chatId, messageText);
    }

    if (userState.state === "Selection of Plan") {
      const investmentAmount = parseFloat(messageText);

      if (!isNaN(investmentAmount) && investmentAmount >= 50) {
        await model.removeUserStateByChatID(chatId);
        // await model.saveInitialTransaction(chatId);
        this.sendInlineKeyboard(
          chatId,
          renderMessage(JSONMessage.PLAN_1_CONFIRMATION_MESSAGE, {
            amount: investmentAmount,
          }),
          keyboard.CONFIRM_KEY_BOARD
        );
      } else {
        this.sendMessage(
          chatId,
          JSONMessage.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM
        );
      }
    }
  } catch (error) {
    errorHandler.handleError(chatId, "handleMessage", error);
  }
};

exports.handleWithoutMemberShip = (chatId) => {
  return this.sendInlineKeyboard(
    chatId,
    renderMessage(JSONMessage.JOIN_CHANNEL),
    [
      [
        {
          text: "Join Channel",
          url: `https://t.me/${process.env.CHANNEL_USERNAME.replace("@", "")}`,
        },
      ],
    ]
  );
};

exports.showDashboardDetails = (chatId) => {
  const message = renderMessage(JSONMessage.DASHBOARD_MESSAGE);
  const keyBoard = [];

  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.showPlanDetails = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_MESSAGE);
  const keyBoard = keyboard.PLANS_KEYBOARD;

  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.handlePlan1Selection = async (chatId) => {
  try {
    const message = renderMessage(JSONMessage.ASK_AMOUNT_MESSAGE);

    await model.saveUserState(chatId, "Selection of Plan", "Plan 1");

    this.sendInlineKeyboard(chatId, message);
  } catch (error) {
    errorHandler.handleError(chatId, "handlePlan1Selection", error);
  }
};

exports.handlePlan2Selection = async (chatId) => {
  const message = renderMessage(JSONMessage.ASK_AMOUNT_MESSAGE);

  await model.saveUserState(chatId, "Selection of Plan", "Plan 2");

  this.sendInlineKeyboard(chatId, message);
};

exports.handlePlan3Selection = async (chatId) => {
  const message = renderMessage(JSONMessage.ASK_AMOUNT_MESSAGE);

  await model.saveUserState(chatId, "Selection of Plan", "Plan 3");

  this.sendInlineKeyboard(chatId, message);
};

exports.investInPlan1 = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_1_CONFIRMATION_MESSAGE);
  const keyBoard = keyboard.PLAN_3_KEYBOARD;
  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.investInPlan2 = (chatId) => {};
exports.investInPlan3 = (chatId) => {};

exports.sendRedirectButton = async (chatId, data) => {
  const params = encodeObject(data);
  const url = `https://demo-payment-integration.onrender.com/?data=${params}`;
  const buttons = [
    [
      {
        text: "Go to Website",
        url: url,
      },
    ],
  ];
  this.sendInlineKeyboard(
    chatId,
    "Click the button to go to the website.",
    buttons
  );
};
