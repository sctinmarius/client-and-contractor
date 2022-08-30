const { Op } = require("sequelize");
const { Contract } = require("../model");

const contractServices = {
  get: async (profileId, id) => {
    try {
      return await Contract.findOne({
        where: {
          id,
          [Op.or]: [
            {
              ClientId: profileId,
            },
            {
              ContractorId: profileId,
            },
          ],
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  getAll: async (profileId) => {
    try {
      return await Contract.findAll({
        where: {
          [Op.or]: [
            {
              ClientId: profileId,
            },
            {
              ContractorId: profileId,
            },
          ],
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { contractServices };
