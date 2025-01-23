module.exports = (callback) => {
  let startCallback;
  let endDigit;
  const parts = callback.split("_");

  if (parts && parts.length <= 2) {
    return { startCallback: callback, endDigit };
  }
  startCallback = parts.slice(0, -1).join("_");
  endDigit = parts[parts.length - 1];

  return { startCallback, endDigit };
};
