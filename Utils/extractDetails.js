const extractDetails = {};

extractDetails.getChatId = (msg) => {
  return msg && msg.chat && msg.chat.id;
};

extractDetails.getChatType = (msg) => {
  return msg && msg.chat && msg.chat.type;
};

extractDetails.getMessage = (msg) => {
  return msg && msg.text;
};

extractDetails.getMessageId = (msg) => {
  return msg && msg.message_id;
};

extractDetails.getGroupName = (msg) => {
  return msg && msg.chat && msg.chat.title;
};

module.exports = extractDetails;
