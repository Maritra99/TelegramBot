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

keyboard.DASHBOARD_KEYBOARD = [
  [{ text: "🎯 New Investment", callback_data: "view_plans" }],
  [
    { text: "📈 Referral Stats", callback_data: "referral_stats" },
    { text: "🎁 ₹50 Bonus Status", callback_data: "bonus_status" },
  ],
  [{ text: "📜 Transaction History", callback_data: "transaction_history" }],
  [{ text: "🔙 Back to Main Menu", callback_data: "start_message" }],
];

keyboard.PLANS_KEYBOARD = [
  [
    { text: "💰 Plan 1", callback_data: "plan_one" },
    { text: "💼 Plan 2", callback_data: "plan_two" },
  ],
  [{ text: "📊 Plan 3", callback_data: "plan_three" }],
  [{ text: "🔙 Back to Menu", callback_data: "back_menu" }],
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
      callback_data: "approve_payment",
    },
    {
      text: "❌ Payment Failed",
      callback_data: "reject_payment",
    },
  ],
];

module.exports = keyboard;
