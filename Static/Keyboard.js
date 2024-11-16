const keyboard = {};

keyboard.JOIN_CHANNEL_KEYBOARD = [
  [
    {
      text: "Join Channel",
      url: `https://t.me/${process.env.CHANNEL_USERNAME.replace("@", "")}`,
    },
  ],
];

keyboard.PLANS_KEYBOARD = [
  [
    { text: "💰 Plan 1", callback_data: "select_plan_1" },
    { text: "💼 Plan 2", callback_data: "select_plan_2" },
  ],
  [{ text: "📊 Plan 3", callback_data: "select_plan_3" }],
  [{ text: "🔙 Back to Menu", callback_data: "back_to_menu" }],
];

module.exports = keyboard;
