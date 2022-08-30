const { Router } = require("express");
const { getAdminRoutes } = require("./admin");
const { getBalancesRoutes } = require("./balances");
const { getContractsRoutes } = require("./contracts");
const { getJobsRoutes } = require("./jobs");

const getRoutes = () => {
  const router = Router();
  router.use("/contracts", getContractsRoutes());
  router.use("/jobs", getJobsRoutes());
  router.use("/balances", getBalancesRoutes());
  router.use("/admin", getAdminRoutes());

  return router;
};

module.exports = { getRoutes };
