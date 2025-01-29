const botHelper = require("../../Bot/botHelper");
const userModel = require("../../Model/userModel");
const { notifyErrorToAdmin } = require("../../Utils/notifyToAdmin");

module.exports = async ({ userChatId }) => {
  const user = await userModel.findByChatID(userChatId);

  if (user) {
    const referralLink = `https://t.me/${process.env.BOT_USERNAME}?start=REF_${user.chatId}`;
    const inlineKeyboard = [
      [
        {
          text: "📤 Share with Friends",
          switch_inline_query: `Join this awesome investment bot: ${referralLink}`,
        },
      ],
    ];

    botHelper.sendKeyboardToUser(
      userChatId,
      "Share your referral link with friends to earn rewards:",
      inlineKeyboard
    );
  } else {
    botHelper.sendMessageToUser(userChatId, "User Data Missing");

    const errorMessageForAdmin = `User Id not found while referring ${userChatId}`;

    notifyErrorToAdmin(errorMessageForAdmin);
  }
};
