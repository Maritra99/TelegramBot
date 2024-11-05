const JSONMessage = {};

JSONMessage.START_MESSAGE =
  "Introducing the {amount}% Interest Bot.\n\nYour automated financial assistant for growing investments at a 12% annual interest rate.";

JSONMessage.JOIN_CHANNEL =
  "🌟 Join Our Channel to Use the Bot! 🚀\n\n📢 Channel Name: Demo Channel\n\nLet's grow together! 💰";
JSONMessage.UNKNOWN_BUTTON =
  "Oops! 🙊 That seems unfamiliar. I'm here to assist with your investments. For help or questions, type 'Help' or explore other options below";

JSONMessage.DASHBOARD_MESSAGE =
  "🌟 Welcome to the 12% Interest Bot! 🚀\n\nHere's your current investment overview:\n\n-Total Invested Amount: 10000 💵\n- Current Balance: 10020 💰\n- Accrued Interest: 20 📈\n\nFeel free to explore your investments and manage them efficiently with our bot. If you have any questions or need assistance, just type 'Help'!";

JSONMessage.PLAN_MESSAGE = "🎉 **Choose Your Investment Plan & Start Earning Today!** 💸\n\n🔹 **Plan 1: Quick & Rewarding!** 🔹\n💰 **Investment Amount:** *Starts from ₹50*\n⏳ **Duration:** *10 days*\n📈 **Expected Profit:** *2%*\n🔥 **Fast returns in just 10 days!**\n\n🔸 **Plan 2: Long-Term Growth!** 🔸\n💰 **Investment Amount:** *Starts from ₹50* \n⏳ **Duration:** *30 days*\n📈 **Expected Profit:** *6%*\n🌱 **A steady growth with bigger rewards in 30 days!**\n\n🌟 **Plan 3: Maximum Growth!** 🌟\n💰 **Investment Amount:** *Starts from ₹50*\n⏳ **Duration:** *90 days*\n📈 **Expected Profit:** *18%*\n🌳 **The ultimate growth over 3 months — for those who want big returns!**\n\n✨ **Which plan fits your goals?** ✨\n✅ *Fast, steady, or maximum returns — Choice is yours!*\n\n🔘 *Tap below to invest today!*";
JSONMessage.PLAN_1_MESSAGE =
  "🎉 You've selected Plan 1! 🎉\n\n💰 Investment Amount: {amount}\n\n📈 Expected Profit: {profit}%\n\n⏳ Duration:{duration}\n\nAre you ready to proceed with this investment? 🤔\n\n🔸 Please click below to confirm your decision!";
JSONMessage.PLAN_2_MESSAGE =
  "🎉 You've selected Plan 2! 🎉\n\n💰 Investment Amount: {amount}\n\n📈 Expected Profit: {profit}%\n\n⏳ Duration:{duration}\n\nAre you ready to proceed with this investment? 🤔\n\n🔸 Please click below to confirm your decision!";
JSONMessage.PLAN_3_MESSAGE =
  "🎉 You've selected Plan 3! 🎉\n\n💰 Investment Amount: {amount}\n\n📈 Expected Profit: {profit}%\n\n⏳ Duration:{duration}\n\nAre you ready to proceed with this investment? 🤔\n\n🔸 Please click below to confirm your decision!";
JSONMessage.GENERIC_ERROR_MESSAGE =
  "Oops! Something went wrong. This issue is reported to admin. Please try again later.";
module.exports = JSONMessage;
