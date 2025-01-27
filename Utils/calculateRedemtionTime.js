module.exports = (transactionTime, duration) => {
  const parsedDuration = parseInt(duration, 10);
  const redemptionDate = new Date(transactionTime);
  redemptionDate.setDate(redemptionDate.getDate() + parsedDuration);
  return redemptionDate;
};
