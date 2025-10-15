const express = require("express");
const path = require("path");

const { addbannerControllers, deletebannerControllers} = require("../../../controllers/bannerControllers");
const { TokenCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authMiddleware");
const upload = require("../../../utils/multer.img.upload");

const router = express.Router();





router.post("/addbanner", TokenCheckMiddleware, adminCheckMiddleware, upload.single("banner"), addbannerControllers);

router.delete("/deletebanner/:id", TokenCheckMiddleware, adminCheckMiddleware, deletebannerControllers); 

module.exports = router;
