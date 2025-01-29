const { notifyErrorToAdmin } = require("../Utils/notifyToAdmin");
const model = require("./schema");

const userModel = {};

userModel.saveUserIfNotPresent = async (chatId, name, referedBy) => {
  chatId = String(chatId);

  const existing = await model.UserModel.findOne({ chatId }).lean().exec();

  if (!existing) {
    notifyErrorToAdmin(`${chatId} has Joined our team`);

    return model.UserModel.findOneAndUpdate(
      { chatId },
      { chatId, name, referedBy },
      { upsert: true, new: true }
    )
      .lean()
      .exec();
  } else {
    return existing;
  }
};

userModel.findByChatID = async (chatId) => {
  return model.UserModel.findOne({ chatId }).lean().exec();
};

userModel.findReferralDataByChatId = (chatId) => {
  return model.UserModel.aggregate([
    {
      $match: {
        referedBy: chatId,
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "chatId",
        foreignField: "chatId",
        as: "transactions",
      },
    },
    {
      $unwind: {
        path: "$transactions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$referedBy",
        usersWithTransactions: {
          $push: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $ifNull: ["$transactions.transactions", []],
                    },
                  },
                  0,
                ],
              },
              then: "$name",
              else: "$$REMOVE",
            },
          },
        },
        usersWithoutTransactions: {
          $push: {
            $cond: {
              if: {
                $eq: [
                  {
                    $size: {
                      $ifNull: ["$transactions.transactions", []],
                    },
                  },
                  0,
                ],
              },
              then: "$name",
              else: "$$REMOVE",
            },
          },
        },
      },
    },
  ]).exec();
};

module.exports = userModel;
