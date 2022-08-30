const { Router } = require("express");
const { jobController } = require("../controllers");

const getJobsRoutes = () => {
  const router = Router();
  router.get("/unpaid", jobController.getUnPaidJobs);
  router.post("/:job_id/pay", jobController.payForAJob);

  return router;
};

module.exports = {
  getJobsRoutes,
};
