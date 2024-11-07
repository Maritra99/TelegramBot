const userModel = require("../Model/userModel");
const transanctionModel = require("../Model/transactionModel");
const keyboard = require("../Static/keyBoard");
const JSONMessage = require("../Static/message");
const renderMessage = require("../Static/renderMessage");
const { userState } = require("../Static/userState");
const bot = require("./createBot");
const errorHandler = require("./errorHandler");
const utils = require("../Utils/generateQRCode");
const { fetchPlanByPlanName } = require("../Model/planModel");

exports.sendMessage = (chatId, messageText, inlineKeyboard) => {
  bot.sendMessage(chatId, messageText, {
    parse_mode: "Markdown",
    reply_markup: inlineKeyboard?.reply_markup || undefined,
  });
};

exports.sendImage = (chatId, imagePath, caption) => {
  bot.sendPhoto(
    chatId,
    imagePath,
    {
      caption: caption,
      parse_mode: "Markdown",
    },
    { filename: "upi-qr", contentType: "image/jpeg" }
  );
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

exports.handleStartMessage = async (chatId) => {
  await userModel.saveUserState(chatId, userState.STARTING_BOT);
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
    const latestState = await userModel.findUserStateByChatID(chatId);

    if (!latestState) {
      return this.sendMessage(chatId, messageText);
    }

    const allowedState = [
      userState.select_plan_1,
      userState.select_plan_2,
      userState.select_plan_3,
    ];

    if (allowedState.includes(latestState.state)) {
      this.handleEnteredPaymentAmount(chatId, messageText, latestState.plan);
    }
  } catch (error) {
    await userModel.removeUserStateByChatID(chatId);
    await transanctionModel.removeTransactionByChatId(chatId);
    errorHandler.handleError(chatId, "handleMessage", error);
  }
};

exports.handleEnteredPaymentAmount = async (chatId, messageText, plan) => {
  const investmentAmount = parseFloat(messageText);

  const planDetails = await fetchPlanByPlanName(plan);

  if (!isNaN(investmentAmount) && investmentAmount >= 50) {
    await transanctionModel.updateTransaction(chatId, {
      amount: investmentAmount,
    });
    await userModel.saveUserState(chatId, userState.ENTERED_AMOUNT_TO_INVEST);
    this.sendInlineKeyboard(
      chatId,
      renderMessage(JSONMessage.PLAN_CONFIRMATION_MESSAGE, {
        planName: plan,
        amount: investmentAmount,
        interest: planDetails.interest,
        time: planDetails.time,
        profit:
          investmentAmount +
          (investmentAmount * parseInt(planDetails.interest)) / 100,
      }),
      keyboard.CONFIRM_KEY_BOARD
    );
  } else {
    this.sendMessage(
      chatId,
      JSONMessage.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM
    );
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

    const initialTransaction = {
      plan: "Plan 1",
      userPaymentState: "PENDING",
      adminPaymentState: "PENDING",
    };

    await userModel.saveUserState(chatId, userState.select_plan_1);
    await transanctionModel.updateTransaction(chatId, initialTransaction);

    this.sendInlineKeyboard(chatId, message);
  } catch (error) {
    await userModel.removeUserStateByChatID(chatId);
    await transanctionModel.removeTransactionByChatId(chatId);
    errorHandler.handleError(chatId, "handlePlan1Selection", error);
  }
};

exports.handlePlan2Selection = async (chatId) => {
  try {
    const message = renderMessage(JSONMessage.ASK_AMOUNT_MESSAGE);

    const initialTransaction = {
      plan: "Plan 2",
      userPaymentState: "PENDING",
      adminPaymentState: "PENDING",
    };

    await userModel.saveUserState(chatId, userState.select_plan_2);
    await transanctionModel.updateTransaction(chatId, initialTransaction);

    this.sendInlineKeyboard(chatId, message);
  } catch (error) {
    await userModel.removeUserStateByChatID(chatId);
    await transanctionModel.removeTransactionByChatId(chatId);
    errorHandler.handleError(chatId, "handlePlan2Selection", error);
  }
};

exports.handlePlan3Selection = async (chatId) => {
  try {
    const message = renderMessage(JSONMessage.ASK_AMOUNT_MESSAGE);

    const initialTransaction = {
      plan: "Plan 3",
      userPaymentState: "PENDING",
      adminPaymentState: "PENDING",
    };

    await userModel.saveUserState(chatId, userState.select_plan_3);
    await transanctionModel.updateTransaction(chatId, initialTransaction);

    this.sendInlineKeyboard(chatId, message);
  } catch (error) {
    await userModel.removeUserStateByChatID(chatId);
    await transanctionModel.removeTransactionByChatId(chatId);
    errorHandler.handleError(chatId, "handlePlan3Selection", error);
  }
};

exports.handleConfirmAmount = async (chatId) => {
  try {
    const data = await transanctionModel.fetchTransactionByChatId(chatId);

    utils.sendUPIDetails(chatId, data.amount);
  } catch (error) {
    await userModel.removeUserStateByChatID(chatId);
    await transanctionModel.removeTransactionByChatId(chatId);
    errorHandler.handleError(chatId, "handleConfirmAmount", error);
  }
};

exports.handleRestart = (chatId) => {
  this.handleStartMessage(chatId);
};
