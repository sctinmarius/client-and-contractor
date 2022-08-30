const { Router } = require("express");
const { contractController } = require("../controllers");

const getContractsRoutes = () => {
  const router = Router();
  router.get("/:id", contractController.getContractById);
  router.get("/", contractController.getAllContracts);

  return router;
};

module.exports = {
  getContractsRoutes,
};
