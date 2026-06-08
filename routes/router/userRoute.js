const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  createUserSchema,
  loginSchema,
} = require("../../validations/userValidation");
const fileController = require("../../controllers/fileUploadController");
const { authenticateToken } = require("../../libs/service/authentication/auth");

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
router.post("/file-upload", fileController.fileUpload);
router.get("/profile", authenticateToken, userController.getProfile);
router.put("/profile", authenticateToken, userController.updateProfile);

module.exports = router;
