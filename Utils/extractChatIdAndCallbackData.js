module.exports = (callback) => {
  const parts = callback.split("_");

  let startCallback;
  let midDigit;
  let endDigit;

  if (parts.length <= 2) {
    startCallback = callback;
    endDigit = undefined;
  } else if (parts.length === 3) {
    startCallback = parts.slice(0, 2).join("_");
    endDigit = parts[2];
  } else if (parts.length === 4) {
    startCallback = parts.slice(0, 2).join("_");
    midDigit = parts[2];
    endDigit = parts[3];
  }

  return { startCallback, midDigit, endDigit };
};
