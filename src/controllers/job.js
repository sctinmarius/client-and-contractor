const { Op } = require("sequelize");
const { sequelize } = require("../model");

const jobController = {
  getUnPaidJobs: async (req, res, next) => {
    try {
      const { Job, Contract } = req.app.get("models");
      const profileId = req.headers["profile_id"];
      const unpaidJobs = await Job.findAll({
        include: {
          model: Contract,
          where: {
            status: "in_progress",
            [Op.or]: [
              {
                ClientId: profileId,
              },
              {
                ContractorId: profileId,
              },
            ],
          },
        },
        where: {
          paid: {
            [Op.not]: true,
          },
        },
      });
      if (!unpaidJobs) return res.status(404).end();
      return res.json(unpaidJobs);
    } catch (error) {
      return next(error);
    }
  },

  payForAJob: async (req, res, next) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const { Profile, Job, Contract } = req.app.get("models");
      const profileId = req.headers["profile_id"];
      const { job_id } = req.params;

      const job = await Job.findOne(
        {
          include: {
            model: Contract,
            where: {
              status: "in_progress",
              ClientId: profileId,
            },
          },
          where: { id: job_id },
        },
        { transaction }
      );

      if (!job)
        return res.status(404).send({ message: "The job's contract is not active!" });

      const activeContract = job.Contract;
      const { price } = job;

      const clientProfile = await Profile.findOne(
        {
          where: {
            id: activeContract.ClientId,
            balance: {
              [Op.gte]: price,
            },
          },
        },
        { transaction }
      );

      if (!clientProfile)
        return res.status(404).send({ message: "The client has insufficient funds." });

      const contractorProfile = await Profile.findOne(
        {
          where: { id: activeContract.ContractorId },
        },
        { transaction }
      );

      if (!contractorProfile)
        return res
          .status(404)
          .send({ message: "I did not find the Contractor profile." });

      // update contractor balance
      await contractorProfile.increment("balance", { by: price }, { transaction });

      // update client balance
      await clientProfile.decrement("balance", { by: price }, { transaction });

      await transaction.commit();
      res.json({ job, clientProfile, contractorProfile });
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
  },
};

module.exports = { jobController };
