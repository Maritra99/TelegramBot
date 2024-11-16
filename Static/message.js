const message = {};

message.START_MESSAGE =
  "Introducing the 12% Interest Bot.\n\nYour automated financial assistant for growing investments at a 12% annual interest rate.";

message.JOIN_CHANNEL =
  "🌟 Join Our Channel to Use the Bot! 🚀\n\n📢 Channel Name: Demo Channel\n\nLet's grow together! 💰";

message.UNKNOWN_BUTTON =
  "Oops! 🙊 That seems unfamiliar. I'm here to assist with your investments. For help or questions, type 'Help' or explore other options below";

message.DASHBOARD_MESSAGE =
  "🌟 Welcome to the 12% Interest Bot! 🚀\n\nHere's your current investment overview:\n\n-Total Invested Amount: 10000 💵\n- Current Balance: 10020 💰\n- Accrued Interest: 20 📈\n\nFeel free to explore your investments and manage them efficiently with our bot. If you have any questions or need assistance, just type 'Help'!";

message.PLAN_MESSAGE =
  "🎉 **Choose Your Investment Plan & Start Earning Today!** 💸\n\n🔹 **Plan 1: Quick & Rewarding!** 🔹\n💰 **Investment Amount:** *Starts from ₹50*\n⏳ **Duration:** *10 days*\n📈 **Expected Profit:** *2%*\n🔥 **Fast returns in just 10 days!**\n\n🔸 **Plan 2: Long-Term Growth!** 🔸\n💰 **Investment Amount:** *Starts from ₹50* \n⏳ **Duration:** *30 days*\n📈 **Expected Profit:** *6%*\n🌱 **A steady growth with bigger rewards in 30 days!**\n\n🌟 **Plan 3: Maximum Growth!** 🌟\n💰 **Investment Amount:** *Starts from ₹50*\n⏳ **Duration:** *90 days*\n📈 **Expected Profit:** *18%*\n🌳 **The ultimate growth over 3 months — for those who want big returns!**\n\n✨ **Which plan fits your goals?** ✨\n✅ *Fast, steady, or maximum returns — Choice is yours!*\n\n🔘 *Tap below to invest today!*";

message.ASK_AMOUNT_MESSAGE = "Please Enter Amount you want to invest";

message.PLAN_CONFIRMATION_MESSAGE =
  "🎉 You've selected {planName}! 🎉\n\n💰 Investment Amount: {amount}\n\n💸 Interest Rate: {interest}\n\n📈 Expected Profit: {profit}\n\n⏳ Duration: {time}\n\nAre you ready to proceed with this investment? 🤔\n\n🔸 Please click below to confirm your decision!";

message.PAYMENT_REQUEST_MESSAGE =
  "📝 **Payment Details**\n\n💳 **UPI ID:** {upiId}\n💰 **Amount:** ₹{amount}\n\nScan the QR code below to make the payment.";

message.TEXT_WITH_QR = "📷 *Scan this QR code to pay*";

message.PAYMENT_UPDATE_ERROR =
  "🚨 Oops! Something didn't go as planned, but rest assured—your funds are safe with us. If you have any concerns, feel free to reach out to our support team! 🙋‍♂️";

message.PAYMENT_SUCCESS_MESSAGE =
  "🥂 Welcome to the Elite Club! Your payment is on its way to being processed, which should take just 5-10 minutes. Sit tight and get ready for the rewards to roll in! 🚀💸";

message.PAYMENT_UNEXPECTED_ERROR =
  "😬 Oops! Something went wrong while processing your payment. Our team is on it! If this continues, please contact support for assistance. 📞";

message.GENERIC_ERROR_MESSAGE =
  "Oops! Something went wrong. This issue is reported to admin. Please try again later.";

message.UNKNOWN_COMMAND = "Unknown Command";

message.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM =
  "⚠️ **Please enter a valid amount greater than ₹50.**";

module.exports = message;
