const message = {};

message.START_MESSAGE =
  "<b>🔒 Invest Securely, Earn Reliably.</b>\n\n📈 Invest and earn a stable 12% annual return. Simple, secure, and automated. Let your money grow!";

message.JOIN_CHANNEL =
  "🌟 Join Our Channel to Use the Bot! 🚀\n\n📢 Channel Name: {channelName}\n\nLet's grow together! 💰";

message.UNKNOWN_BUTTON =
  "Oops! 🙊 That seems unfamiliar. I'm here to assist with your investments. For help or questions, type 'Help' or explore other options below";

message.DASHBOARD_MESSAGE =
  "🌟 <b>Your Investment Summary</b>\n\n<b>💼 Current Investments:</b>\n\n<b>💰 Active Investments:</b> <i>{active}</i>\n<b>⏳ Pending Investments:</b> <i>{pending}</i>\n<b>❌ Failed Investments:</b> <i>{failed}</i>\n\n<b>🎯 Start Investing:</b>\nExplore our available plans and begin your investment journey today! 🚀\n\n💡 Use <b>New Investment</b> to find the best option for you.";

message.PLAN_MESSAGE =
  "🎉 <b>Choose Your Investment Plan & Start Earning Today!</b> 💸\n\n🔹 <b>Plan 1: Quick & Rewarding!</b> 🔹\n💰 <b>Investment Amount:</b> <i>Starts from ₹50</i>\n⏳ <b>Duration:</b> <i>10 days</i>\n📈 <b>Expected Profit:</b> <i>10%</i>\n🔥 <b>Fast returns in just 10 days!</b>\n\n🔸 <b>Plan 2: Long-Term Growth!</b> 🔸\n💰 <b>Investment Amount:</b> <i>Starts from ₹50</i>\n⏳ <b>Duration:</b> <i>30 days</i>\n📈 <b>Expected Profit:</b> <i>30%</i>\n🌱 <b>A steady growth with bigger rewards in 30 days!</b>\n\n🌟 <b>Plan 3: Maximum Growth!</b> 🌟\n💰 <b>Investment Amount:</b> <i>Starts from ₹50</i>\n⏳ <b>Duration:</b> <i>90 days</i>\n📈 <b>Expected Profit:</b> <i>90%</i>\n🌳 <b>The ultimate growth over 3 months — for those who want big returns!</b>\n\n✨ <b>Which plan fits your goals?</b> ✨\n✅ <i>Fast, steady, or maximum returns — Choice is yours!</i>\n\n🔘 <i>Tap below to invest today!</i>";

message.ASK_AMOUNT_MESSAGE = "<b>Please enter amount you want to invest</b>";

message.PLAN_CONFIRMATION_MESSAGE =
  "🎉 <b>You've selected {planName}!</b> 🎉\n\n💰 <b>Investment Amount:</b> {amount}\n💸 <b>Interest Rate:</b> {interest}\n📈 <b>Expected Profit:</b> {profit}\n⏳ <b>Duration:</b> {time}\n🤔 <b>Are you ready to proceed with this investment?</b>\n\n🔸 <i>Please click below to confirm your decision!</i>";

message.PAYMENT_REQUEST_MESSAGE =
  "📝 **Payment Details**\n\n💳 **UPI ID:** {upiId}\n💰 **Amount:** ₹{amount}\n\nScan the QR code below to make the payment.";

message.TEXT_WITH_QR =
  "📸 <b>Ready to make your payment?</b> <br><br>Simply scan this QR code and complete your transaction effortlessly!";

message.PAYMENT_UPDATE_ERROR =
  "🚨 Oops! Something didn't go as planned, but rest assured—your funds are safe with us. If you have any concerns, feel free to reach out to our support team! 🙋‍♂️";

message.PAYMENT_SUCCESS_MESSAGE =
  "🥂 Welcome to the Elite Club! Your payment is on its way to being processed, which should take just 5-10 minutes. Sit tight and get ready for the rewards to roll in! 🚀💸";

message.PAYMENT_UNEXPECTED_ERROR =
  "😬 Oops! Something went wrong while processing your payment. Our team is on it! If this continues, please contact support for assistance. 📞";

message.GENERIC_ERROR_MESSAGE =
  "⚠️ <b>Oops! Something went wrong.</b><br><br>Don't worry, the issue has been reported to our team. Please try again in a little while!";

message.UNKNOWN_COMMAND =
  "🤔 <b>I'm sorry, I didn't understand that command.</b><br><br>Please use the menu or type /help to see the list of available commands.";

message.AMOUNT_SHOULD_NOT_BE_LOWER_THAN_MINIMUM =
  "⚠️ <b>Invalid Amount!</b> Please enter an amount greater than ₹50 to proceed.";

message.TRANSACTION_NOT_FOUND =
  "⚠️ <b>Transaction Not Found!</b> We couldn't find the details of your transaction. Please check and try again.";

module.exports = message;
