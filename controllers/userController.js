const userService = require("../services/userService");

const createUser = async (req, res) => {
  const responseData = await userService.createUser(req.body);
  return res.json(responseData);
};

module.exports = {
  createUser,
};
