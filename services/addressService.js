const address = require("../models/address");
const handleResponse = require("../libs/helpers/handleResponse");
const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../libs/utils/enums");
const message = require("../libs/utils/message");
const mongoose = require("mongoose");

const addAddress = async (id, addressPayload) => {
  const addAddressPayload = {
    ...addressPayload,
    user_id: new mongoose.Types.ObjectId(id),
  };
  const addressData = await address.create(addAddressPayload);
  return handleResponse(
    StatusCodes.CREATED,
    responseData.SUCCESS,
    `Address ${message.ADD_SUCCESS}`,
    {
      _id: addressData._id,
    },
  );
};

const viewAddress = async (id) => {
  const addressId = new mongoose.Types.ObjectId(id);
  const addressData = await address.findById(addressId);
  if (!addressData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Address ${message.NOT_FOUND}`,
    );
  }
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Address ${message.GET_SUCCESS}`,
    addressData,
  );
};

const editAddress = async (id, addressData) => {
  const { address_id, ...updateAddressData } = addressData;
  if (!address_id) {
    return handleResponse(
      StatusCodes.BAD_REQUEST,
      responseData.FAILED,
      message.ADDRESS_ID_REQUIRED,
    );
  }
  const addressId = new mongoose.Types.ObjectId(address_id);
  const currentAddress = await address.findById(addressId);
  if (!currentAddress) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Address ${message.NOT_FOUND}`,
    );
  }

  const updatedData = {
    ...updateAddressData,
    user_id: new mongoose.Types.ObjectId(id),
  };

  const updateAddress = await address.findByIdAndUpdate(
    addressId,
    updatedData,
    {
      new: true,
    },
  );
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Address ${message.UPDATE_SUCCESS}`,
  );
};

const deleteAddress = async (id) => {
  const addressId = new mongoose.Types.ObjectId(id);
  const addressData = await address.findByIdAndDelete(addressId);
  if (!addressData) {
    return handleResponse(
      StatusCodes.NOT_FOUND,
      responseData.FAILED,
      `Address ${message.NOT_FOUND}`,
    );
  }
  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Address ${message.DELETE_SUCCESS}`,
  );
};

module.exports = {
  addAddress,
  viewAddress,
  editAddress,
  deleteAddress,
};
