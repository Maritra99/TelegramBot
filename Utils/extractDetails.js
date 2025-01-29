const extractDetails = {};

extractDetails.getName = (msg) => {
  let str = "";

  if (msg && msg.chat && msg.chat.first_name) {
    str += msg.chat.first_name;
  }

  str += " ";

  if (msg && msg.chat && msg.chat.last_name) {
    str += msg.chat.last_name;
  }
  return str.trim();
};

extractDetails.getChatId = (msg) => {
  return msg && msg.chat && msg.chat.id && String(msg.chat.id);
};

extractDetails.getChatType = (msg) => {
  return msg && msg.chat && msg.chat.type && String(msg.chat.type);
};

extractDetails.getMessage = (msg) => {
  return msg && msg.text && String(msg.text);
};

extractDetails.getMessageId = (msg) => {
  return msg && msg.message_id && String(msg.message_id);
};

extractDetails.getGroupName = (msg) => {
  return msg && msg.chat && msg.chat.title && String(msg.chat.title);
};

extractDetails.getReferralCode = (msg) => {
  return String(msg).split(" ")[1] &&
    String(msg).split(" ")[1].startsWith("REF_")
    ? String(msg).split("REF_")[1]
    : "";
};

extractDetails.getReferrerChatId = (msg) => {
  return String(msg).replace("REF_", "");
};

module.exports = extractDetails;
