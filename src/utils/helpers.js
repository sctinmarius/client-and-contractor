const moment = require("moment");

const DATE_FORMAT = "YYYY-MM-DD";
const toDateFormat = (date) => moment(new Date(date)).format(DATE_FORMAT);
const isValidData = (date) => moment(date, DATE_FORMAT, true).isValid();

module.exports = {
  toDateFormat,
  isValidData,
};
