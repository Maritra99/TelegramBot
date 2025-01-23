module.exports = (chatId) => {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  return `${chatId}_${unixTimestamp}`;
};
