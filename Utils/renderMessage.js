module.exports = (message, data = {}) => {
  return message.replace(/{(.*?)}/g, (match, p1) => {
    return p1 in data ? data[p1] : match;
  });
};
