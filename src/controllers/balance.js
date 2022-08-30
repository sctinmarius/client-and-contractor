const { sequelize } = require("../model");
const { getLimitDepositForTheClient } = require("../utils/getLimitDepositForTheClient");

const balanceController = {
  deposit: async (req, res, next) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const { Profile, Contract, Job } = req.app.get("models");
      const { userId } = req.params;
      const profileId = req.headers["profile_id"];

      if (userId !== profileId)
        return res
          .status(403)
          .send({ message: "You do not have access to this resource." });

      const clientProfile = await Profile.findOne(
        {
          where: { id: userId, type: "client" },
        },
        { transaction }
      );

      if (!clientProfile)
        return res.status(403).send({ message: "Only the clients can add the money." });

      const { amountOfMoney } = req.body;

      const [clientContracts] = await Contract.findAll(
        {
          attributes: ["ClientId"],
          where: {
            ClientId: userId,
            status: "in_progress",
          },
          include: {
            model: Job,
            attributes: [[sequelize.fn("SUM", sequelize.col("price")), "total_to_pay"]],
          },
        },
        { transaction }
      );

      const isAvailableJobs = clientContracts.Jobs.length > 0;

      if (!isAvailableJobs)
        return res
          .status(404)
          .send({ message: "This client do not have active contract(s)." });

      const { isClientAbleToDepositMoney, limitAmount } = getLimitDepositForTheClient(
        clientContracts,
        amountOfMoney
      );

      if (!isClientAbleToDepositMoney)
        return res
          .status(400)
          .send({ message: `The limit of the deposit is ${limitAmount}` });

      await clientProfile.increment("balance", { by: amountOfMoney }, { transaction });
      await transaction.commit();

      res.send({ message: `The client's balance has been updated` });
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
  },
};

module.exports = {
  balanceController,
};
