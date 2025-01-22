const extractDetails = {};

extractDetails.getChatId = (msg) => {
  return msg && msg.chat && msg.chat.id;
};

extractDetails.getMessage = (msg) => {
  return msg && msg.text;
};

extractDetails.getMessageId = (msg) => {
  return msg && msg.message_id;
};

module.exports = extractDetails;
