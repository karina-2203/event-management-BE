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
  const addressData = await address.findOne({
    _id: addressId,
    isDeleted: false,
  });
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
  const currentAddress = await address.findOne({
    _id: addressId,
    isDeleted: false,
  });
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
  const addressData = await address.findByIdAndUpdate(
    addressId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
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

const listAddress = async (payload) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortOrder = "asc",
    sortBy = "address_line1",
  } = payload || {};

  let filter = { isDeleted: false };

  if (search) {
    filter = {
      address_line1: { $regex: search, $options: "i" },
      isDeleted: false,
    };
  }

  const skip = (page - 1) * limit;

  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    sort.address_line1 = sortOrder === "desc" ? -1 : 1;
  }

  const listAllAddresses = await address
    .find(filter)
    .populate("country_id", "country_name")
    .populate("state_id", "state_name")
    .populate("city_id", "city_name")
    .limit(parseInt(limit))
    .skip(skip)
    .sort(sort);

  const totalAddress = await address.countDocuments(filter);

  return handleResponse(
    StatusCodes.OK,
    responseData.SUCCESS,
    `Address ${message.GET_SUCCESS}`,
    {
      addresses: listAllAddresses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAddress / limit),
        totalAddress,
        limit: parseInt(limit),
      },
    },
  );
};

module.exports = {
  addAddress,
  viewAddress,
  editAddress,
  deleteAddress,
  listAddress,
};
