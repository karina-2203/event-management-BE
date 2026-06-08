const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const { validateRequest } = require("../../libs/helpers/validator");
const {
  createUserSchema,
  loginSchema,
  otpSchema,
  changePasswordSchema,
  profileSchema,
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
router.post("/fileUpload", fileController.fileUpload);
router.get("/viewProfile", authenticateToken, userController.getProfile);
router.put(
  "/editProfile",
  authenticateToken,
  validateRequest(profileSchema, "body"),
  userController.updateProfile,
);
router.post("/verifyEmail", userController.verifyEmail);
router.put(
  "/updatePassword",
  validateRequest(otpSchema, "body"),
  userController.updatePassword,
);
router.put(
  "/changePassword",
  authenticateToken,
  validateRequest(changePasswordSchema, "body"),
  userController.changePassword,
);

module.exports = router;
