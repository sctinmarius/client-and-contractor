const { contractServices } = require("../services/contract");

const contractController = {
  getContractById: async (req, res, next) => {
    try {
      const profileId = req.headers["profile_id"];
      const { id } = req.params;
      const contract = await contractServices.get(profileId, id);
      if (!contract) return res.status(404).end();
      return res.json(contract);
    } catch (error) {
      return next(error);
    }
  },

  getAllContracts: async (req, res, next) => {
    try {
      const profileId = req.headers["profile_id"];
      const contracts = await contractServices.getAll(profileId);
      if (!contracts) return res.status(404).end();
      return res.json(contracts);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = { contractController };
