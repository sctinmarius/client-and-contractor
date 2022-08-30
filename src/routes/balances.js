const { Router } = require("express");
const { balanceController } = require("../controllers");

const getBalancesRoutes = () => {
  const router = Router();
  router.post("/deposit/:userId", balanceController.deposit);

  return router;
};

module.exports = {
  getBalancesRoutes,
};
