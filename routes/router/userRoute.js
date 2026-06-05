const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateRequest } = require("../../libs/helpers/validator");
const { createUserSchema } = require("../../validations/userValidation");

router.post(
  "/create",
  validateRequest(createUserSchema, "body"),
  userController.createUser,
);

module.exports = router;
