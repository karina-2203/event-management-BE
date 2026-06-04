const User = require('../models/user')
const handleResponse = require('../libs/helpers/handleResponse');
const { ResponseData } = require('../libs/utils/enums');
const { StatusCodes } = require('http-status-codes');
const message = require('../libs/utils/message');
const createUser = async (userData) => {
    try {
        const user = await User.create(userData);

        return handleResponse(
            StatusCodes.CREATED,
            ResponseData.SUCCESS,
            message.USER_CREATED,
            user
        );
    } catch (error) {
        handleResponse(
            StatusCodes.BAD_REQUEST,
            ResponseData.ERROR,
            error.message,
            null,
            error
        );
    }
};

module.exports = {
    createUser
}