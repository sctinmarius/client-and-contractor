const getLimitDepositForTheClient = (clientContracts, amountOfMoney) => {
  if (!clientContracts || !amountOfMoney) throw new Error("Please provide the payload!");
  const { total_to_pay } = clientContracts.Jobs[0].dataValues;
  const LIMIT_OF_PERCENTAGE = 25 / 100;
  const limitAmount = total_to_pay * LIMIT_OF_PERCENTAGE;

  return {
    isClientAbleToDepositMoney: limitAmount >= amountOfMoney,
    limitAmount,
  };
};

module.exports = { getLimitDepositForTheClient };
