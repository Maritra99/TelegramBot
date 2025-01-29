const botHelper = require("../../Bot/botHelper");
const userModel = require("../../Model/userModel");
const { notifyErrorToAdmin } = require("../../Utils/notifyToAdmin");

module.exports = async ({ userChatId }) => {
  const referralLink = `https://t.me/${process.env.BOT_USERNAME}?start=REF_${userChatId}`;

  const resp = await userModel.findReferralDataByChatId(userChatId);

  const referralData = resp[0];

  if (referralData) {
    const successReferCount = referralData.usersWithTransactions.length;
    const pendingReferCount = referralData.usersWithoutTransactions.length;
    const referralBonus = successReferCount * 50;

    const totalReferrals = successReferCount + pendingReferCount;

    // Display max 10 names and show "and Many More..." if there are more than 10
    const displayNames = (names) => {
      const maxNames = 10;
      const displayed = names.slice(0, maxNames);
      return (
        displayed.join("\n") +
        (names.length > maxNames ? "\nand Many More..." : "")
      );
    };

    const investedUsers = displayNames(referralData.usersWithTransactions);
    const yetToInvest = displayNames(referralData.usersWithoutTransactions);

    const message = `🎉 <b>Referral Summary</b> 🎉\n\n👤 <b>Your Referrals:</b> ${totalReferrals} people\n💰 <b>Total Earnings from Referrals:</b> ₹${referralBonus}\n\n✅ <b>Invested Users:</b>\n${investedUsers}\n\n❌ <b>Yet to Invest:</b>\n${yetToInvest}\n\n🔗 Keep referring & earn more rewards! 🎁`;

    const inlineKeyboard = [
      [
        {
          text: "📤 Share with Friends",
          switch_inline_query: `Join this awesome investment bot: ${referralLink}`,
        },
      ],
    ];

    botHelper.sendKeyboardToUser(userChatId, message, inlineKeyboard);
  } else {
    notifyErrorToAdmin(
      `Error Occured while Fetching Referral for ChatId: ${userChatId}`
    );

    const errorMessage = `⚠️ Oops! Something went wrong while fetching your referral data. Please try again later. If the issue persists, feel free to contact support. We're working hard to resolve it! 😊`;

    botHelper.sendMessageToUser(userChatId, errorMessage);
  }
};
