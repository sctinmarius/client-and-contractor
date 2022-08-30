const { getLimitDepositForTheClient } = require("./getLimitDepositForTheClient");

const clientContractsTest = {
  Jobs: [
    {
      dataValues: {
        total_to_pay: 100,
      },
    },
  ],
};

describe("getLimitDepositForTheClient", () => {
  it("should return an error if the function do not receive the params", () => {
    try {
      getLimitDepositForTheClient();
    } catch (error) {
      expect(error.message).toBe("Please provide the payload!");
    }
  });

  it("should return false and limit amount 25", () => {
    const { isClientAbleToDepositMoney, limitAmount } = getLimitDepositForTheClient(
      clientContractsTest,
      50
    );
    expect(isClientAbleToDepositMoney).toBe(false);
    expect(limitAmount).toBe(25);
  });

  it("should return true and limit amount 25", () => {
    const { isClientAbleToDepositMoney, limitAmount } = getLimitDepositForTheClient(
      clientContractsTest,
      25
    );
    expect(isClientAbleToDepositMoney).toBe(true);
    expect(limitAmount).toBe(25);
  });
});
