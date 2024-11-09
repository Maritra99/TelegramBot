const extractDetails = {};

extractDetails.getChatId = (msg) => {
  return msg && msg.chat && msg.chat.id;
};

extractDetails.getMessage = (msg) => {
  return msg && msg.text;
};

module.exports = extractDetails;
