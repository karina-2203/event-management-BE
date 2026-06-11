const { StatusCodes } = require("http-status-codes");
const addressService = require("../services/addressService");

const addAddress = async (req, res) => {
  const responseData = await addressService.addAddress(req.body);
  return res.status(StatusCodes.CREATED).json(responseData);
};

module.exports = {
  addAddress,
};
