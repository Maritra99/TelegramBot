const keyboard = require("../Static/keyBoard");
const JSONMessage = require("../Static/message");
const renderMessage = require("../Static/renderMessage");
const bot = require("./createBot");

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

exports.handleMessage = (chatId, messageText) => {
  this.sendMessage(chatId, messageText);
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

exports.handlePlan1 = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_1_MESSAGE);
  const keyBoard = keyboard.PLAN_1_KEYBOARD;
  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.handlePlan2 = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_2_MESSAGE);
  const keyBoard = keyboard.PLAN_2_KEYBOARD;
  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.handlePlan3 = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_3_MESSAGE);
  const keyBoard = keyboard.PLAN_3_KEYBOARD;
  this.sendInlineKeyboard(chatId, message, keyBoard);
};

exports.investInPlan1 = (chatId) => {
  const message = renderMessage(JSONMessage.PLAN_3_MESSAGE);
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
