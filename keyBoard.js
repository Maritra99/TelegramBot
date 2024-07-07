const keyboard = {};

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

module.exports = keyboard;
