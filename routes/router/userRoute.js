const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  createUserSchema,
  loginSchema,
} = require("../../validations/userValidation");
const commonController = require("../../controllers/commonController");

router.post(
  "/create",
  validateRequest(createUserSchema, "body"),
  userController.createUser,
);
router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  userController.login,
);
router.post("/file-upload", commonController.fileUpload);

module.exports = router;
