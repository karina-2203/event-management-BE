const express = require("express");
const router = express.Router();

const userController = require("../../../../controllers/userController");
const { validateRequest } = require("../../../helpers/validator");
const { createUserSchema, loginSchema } = require("../../../../validations/userValidation");

router.post("/create", validateRequest(createUserSchema, "body"), userController.createUser);
router.post("/login", validateRequest(loginSchema, "body"), userController.login);

module.exports = router;
