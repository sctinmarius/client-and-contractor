const { Router } = require("express");
const { adminController } = require("../controllers");

const getAdminRoutes = () => {
  const router = Router();
  router.get("/best-profession", adminController.bestProfession);
  router.get("/best-clients", adminController.bestClients);

  return router;
};

module.exports = {
  getAdminRoutes,
};
