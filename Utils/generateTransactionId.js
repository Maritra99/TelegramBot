module.exports = (chatId) => {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  return `${String(chatId).substring(0, 3).concat(unixTimestamp)}`;
};
