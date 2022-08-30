const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../model");
const { getBestClients } = require("../utils/getBestClients/getBestClients");
const { getContractorMostPaid } = require("../utils/getContractorMostPaid");
const { isValidData, toDateFormat } = require("../utils/helpers");

const adminController = {
  bestProfession: async (req, res, next) => {
    try {
      const { start, end } = req.query;
      const startedDate = toDateFormat(start);
      const endDate = toDateFormat(end);
      if (!isValidData(startedDate) || !isValidData(endDate))
        return res.status(400).send({ message: "Please set a valid data!" });

      const { Profile, Job, Contract } = req.app.get("models");

      const paidContracts = await Contract.findAll({
        include: {
          model: Job,
          where: {
            paid: true,
            paymentDate: {
              [Op.between]: [new Date(startedDate), new Date(endDate)],
            },
          },
        },
        raw: true,
      });

      const contractorMostPaid = getContractorMostPaid(paidContracts);
      if (!contractorMostPaid) return res.status(404).send({ message: "Not found!" });

      const contractor = await Profile.findOne({
        where: {
          id: contractorMostPaid.ContractorId,
        },
      });

      res.json(contractor);
    } catch (error) {
      return next(error);
    }
  },

  bestClients: async (req, res, next) => {
    try {
      const { start, end, limit = 2 } = req.query;
      const startedDate = toDateFormat(start);
      const endDate = toDateFormat(end);
      if (!isValidData(startedDate) || !isValidData(endDate))
        return res.status(400).send({ message: "Please set a valid data!" });

      const clients = await sequelize.query(
        `
      SELECT
        Profiles.id as id,
        Profiles.firstName || ' ' || Profiles.lastName AS fullName,
        (
          SELECT 
            SUM(price) 
          FROM 
            Jobs 
          WHERE 
            Contracts.id = Jobs.ContractId 
          AND
          strftime('%Y-%m-%d', Jobs.paymentDate) BETWEEN :start AND :end
        ) as paid
  
      FROM 
        Profiles

      LEFT JOIN
        Contracts
      ON 
        Contracts.ClientId = Profiles.id

      LEFT JOIN
        Jobs
      ON
        Jobs.ContractId = Contracts.id

      WHERE
        Profiles.type = :type
      AND
        strftime('%Y-%m-%d', Jobs.paymentDate) BETWEEN :start AND :end
      `,
        {
          type: QueryTypes.SELECT,
          replacements: {
            type: "client",
            paid: true,
            start: startedDate,
            end: endDate,
          },
        }
      );

      const bestClients = getBestClients(clients, limit);

      if (bestClients.length === 0)
        return res
          .status(404)
          .send({ message: "I did not find the best clients by this criteria.." });

      res.json(bestClients);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = {
  adminController,
};
