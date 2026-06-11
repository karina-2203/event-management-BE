const address = require("../models/address");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../libs/utils/enums");
const message = require("../libs/utils/message");

const addAddress = async (addressPayload) => {
  const addressData = await address.create(addressPayload);
  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `Address ${message.ADD_SUCCESS}`,
    {
      _id: addressData._id,
    },
  );
};

module.exports = {
  addAddress,
};
