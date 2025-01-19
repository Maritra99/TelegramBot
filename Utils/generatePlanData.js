module.exports = (planName) => {
  const obj = {};
  switch (planName) {
    case "Plan 1":
      obj.name = "Plan 1";
      obj.interest = "10";
      obj.duration = "10";
      break;
    case "Plan 2":
      obj.name = "Plan 2";
      obj.interest = "30";
      obj.duration = "30";
      break;
    case "Plan 3":
      obj.name = "Plan 3";
      obj.interest = "90";
      obj.duration = "90";
      break;
  }

  return obj;
};
