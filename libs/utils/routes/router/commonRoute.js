const express = require("express");
const router = express.Router();

const { validateRequest } = require("../../../helpers/validator");
const commonController = require("../../../../controllers/commonController")

router.post("/file-upload", commonController.fileUpload);

module.exports = router;
