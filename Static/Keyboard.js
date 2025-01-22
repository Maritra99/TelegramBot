const keyboard = {};

keyboard.JOIN_CHANNEL_KEYBOARD = [
  [
    {
      text: "Join Channel",
      url: `https://t.me/${process.env.CHANNEL_USERNAME.replace("@", "")}`,
    },
  ],
];

keyboard.START_MESSAGE_KEYBOARD = [
  [{ text: "📊  Dashboard", callback_data: "dashboard" }],
  [{ text: "📅  View Plans", callback_data: "view_plans" }],
  [
    { text: "⚙️  Settings", callback_data: "settings" },
    { text: "🔒  Privacy Policy", callback_data: "privacy_policy" },
  ],
  [
    { text: "❓ FAQ", callback_data: "faq" },
    { text: "📞  Help", callback_data: "contact_us" },
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

keyboard.CONFIRM_KEY_BOARD = [
  [
    { text: "Confirm", callback_data: "confirm_amount" },
    { text: "Cancel", callback_data: "cancel_amount" },
  ],
];

keyboard.RESTART_KEYBOARD = [
  [{ text: "🔄 Restart", callback_data: "restart_process" }],
];

keyboard.PAYMENT_CONFIRMATION_KEY_BOARD = [
  [
    {
      text: "✅ Payment Successful",
      callback_data: "payment_successful",
    },
    {
      text: "❌ Payment Failed",
      callback_data: "payment_failed",
    },
  ],
];

keyboard.PAYMENT_CONFIRMATION_FOR_ADMIN_KEY_BOARD = [
  [
    {
      text: "✅ Payment Successful",
      callback_data: "admin_payment_successful",
    },
    {
      text: "❌ Payment Failed",
      callback_data: "admin_payment_failed",
    },
  ],
];

module.exports = keyboard;
